const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sample } = require('lodash');
const path = require('path');
const mysql = require('mysql');
const uuid = require('uuid');
// const { param } = require('../routes/user');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    dateStrings: 'date',
    database: process.env.DB_NAME,
  });
 
  // Database query promises
const zeroParamPromise = (sql) => {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  };

  const queryParamPromise = (sql, queryParam) => {
    return new Promise((resolve, reject) => {
      db.query(sql, queryParam, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  };
  
  //User Controllers

//user register controller
exports.getUserRegister = (req, res, next) => {
    res.render('User/register')
}

exports.postUserRegister = async (req, res, next) => {

  const sqlDatetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');

  const { name, email, password, confirmPassword, mobile_phone, region, city, municipality } = req.body;
  
  (await db.query('SELECT email from user WHERE email = ?', [email], async (err, results) => {
    if (err) {
        console.log(err);
    }
    if (results.length > 0) {
        return res.render('User/register', {
           message: 'That email is already in use!'
        })
    } else if(password !== confirmPassword)
        return res.render('User/register', {
            message: 'The passwords do not Match!'
    })
    let hashedPassword = await bcrypt.hash(password, 8)
    console.log(sqlDatetime);

   (await db.query('INSERT into user SET ?', { user_id: uuid.v4(),
        name: name, 
        email: email.toLowerCase(), 
        password: hashedPassword, 
        mobile_phone: mobile_phone, 
        registration_date:  sqlDatetime, 
        region: region, city: 
        city, municipality: municipality
     }, (err, results) => {
        if (err) {
            console.log(err)
        }else {
            
            req.flash('success_msg', 'You are now registered and can log in');
            return res.redirect('/user/login');
        }
    }))
}))
}

//user login controller
exports.getUserLogin =  (req , res, next) =>{
  res.render('User/login') 
}
exports.postUserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let errors = [];
  const sql1 = 'SELECT * FROM user WHERE email = ?';
  const users = await queryParamPromise(sql1, [email]);
  if (
    users.length === 0 ||
    !(await bcrypt.compare(password, users[0].password))
  ) {
    errors.push({ msg: 'Email or Password is Incorrect' });
    res.status(401).render('User/login', { errors });
    } else {
    const token = jwt.sign({ id: users[0].user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
   await db.query(`UPDATE user SET last_login = now() WHERE user_id = '${users[0].user_id}'`);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    res.redirect('/user/dashboard');
  }
}
//View Dashboard with all information
exports.getUserDashboard = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];
 
  res.render('User/dashboard/index', { user: user });
};

//View admin Update Information Page
exports.getUpdateUser = async (req, res, next) => {
 (await db.query('SELECT * FROM user WHERE user_id = ?', [req.params.id ], (err, results) => {
    
    if (!err){
      res.render('User/dashboard/update-user', {userData: results})
    }else {
      console.log(err);
    }
}))
 
}
//School admin/User Update Information
exports.postUpdateUser = async (req, res, next) => {
  const { name, email, mobile_phone, region, city, municipality } = req.body;
  
  (await db.query('UPDATE user SET name = ?, email = ?, mobile_phone = ?, region = ?, city = ?, municipality = ? WHERE user_id = ?',[name, email, mobile_phone, region, city, municipality, req.params.id]))
  
  req.flash('success_msg', 'Admin Information Modified Successfully!');        
      res.redirect('/user/dashboard')
}
//Logout Route For School Admin/user
exports.getUserLogOut = (req, res, next) => {
  res.cookie('jwt', '', {
     maxAge: 1 
    });
  req.flash('success_msg', 'You are logged out');
  res.status(200).redirect('/user/login');
}

//Display School Admin/User Profile Photo
exports.getUserProfilePicture  = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

  const sql1 = 'SELECT user_image FROM user WHERE user_id =?';
  (await db.query(sql1, [user.user_id], (err, result) => {
            
        res.render('User/dashboard/index', {user:  result})
        
    }))
}
//Send School Admin/User Profile Photo to Server
exports.postUserProfilePicture = async (req, res, next) => {
  console.log(req.files);

  if (!req.files)
  return res.status(400).send('No files were uploaded.');

let user_image = req.files.user_image;
let img_name = user_image.name;
img_name = img_name + uuid.v4()
console.log(img_name);

if(user_image.mimetype == "image/jpeg" ||user_image.mimetype == "image/png"||user_image.mimetype == "image/gif" ){
  
  

  user_image.mv('public/dashboard_public/user_image/' + img_name, function(err) {
      if (err)
      return res.status(500).send(err)})
      let errors = [];

      const sql = 'SELECT * FROM user WHERE user_id = ?';
      const user = (await queryParamPromise(sql, [req.user]))[0];
      (await db.query('UPDATE user SET user_image = ? WHERE user_id = ?',[img_name, user.user_id]))
      req.flash('success_msg', 'Profile Photo Updated Successfully!');          
      res.redirect('/user/dashboard')
        
      } else {
 res.json('image Extension not supported')
  }

}

//school Images
exports.getSchoolImages = async (req, res, next) => {
  res.render('User/dashboard/school-images')
}
//get School Images Update
exports.getUpdateSchoolImages = async (req, res, next) => {
  res.render('User/dashboard/school-images-update')
} 

exports.postCreateSchoolFacilitiesImages = async (req, res, next) => {

  const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];

   (await db.query('SELECT user_id from user_facilities_image WHERE user_id = ?', [user.user_id], async (err, results) => {
    if (err) {
        console.log(err);
    }
    if (results.length > 0) {
        return res.render('User/dashboard/school-images', {
           message: 'Data Cannot be created Twice!'
        })
        
      }
    else {
      if (!req.files) {
        return res.render('User/dashboard/school-images', {
          message: 'No Image Uploaded!'
       })
        }
        const file = req.files.images;
            const data = [];
        
        
        // if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
          console.log(req.files);
          if (file.length !== 10){
            
            if ( typeof file.length == 'undefined'){
              { res.render('User/dashboard/school-images', {
                message: `Images must be exactly 10! You Submitted only 1`
             })}
              
            }else
             { res.render('User/dashboard/school-images', {
              message: `Images must be exactly 10! You Submitted ${file.length}`
           })}          
          
          } else {
          function move(image) {
            console.log(image.name);
            try { image.mv('public/dashboard_public/school-facilities/' + image.name); }
            
            catch (e) {
                return res.send({
                    success: false,
                    message: 'upload error'
                });
            }
            
            data.push({
                name: image.name,
                mimeType: image.mimetype,
                size: image.size
            });
        }
        
        Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);
            
        
        
        (await db.query('INSERT into user_facilities_image SET img_1_f = ?, img_2_f = ?, img_3_f = ?, img_4_f = ?, img_5_f = ?, img_6_f = ?, img_7_f = ?, img_8_f = ?, img_9_f = ?, img_10_f = ?, user_id = ?',[data[0].name,data[1].name,data[2].name,data[3].name,data[4].name,data[5].name,data[6].name,data[7].name,data[8].name,data[9].name,user.user_id]))
        
        
        const sql2 = 'SELECT user_id FROM user_facilities_image'
        const AllUserIDs = ( await zeroParamPromise(sql2))
       
        
              req.flash('success_msg', 'Photos of Facilties Created Successfully!');          
              res.redirect('/user/dashboard')
        
        }
    }}))


}

//School Social Activities
exports.postCreateSchoolSocialActivities = async (req, res, next) => {

const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];

(await db.query('SELECT user_id from user_social_activities_image WHERE user_id = ?', [user.user_id], async (err, results) => {
  if (err) {
      console.log(err);
  }
  if (results.length > 0) {
      return res.render('User/dashboard/school-images', {
         message: 'Data Cannot be created Twice!'
      })
      
    } else { if (!req.files) {
      return res.render('User/dashboard/school-images', {
        message: 'No Image Uploaded!'
     })
  }
  const file = req.files.images;
      const data = [];
  console.log(file);
  
  // if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
    
    if (file.length !== 5){
      if ( typeof file.length == 'undefined'){
        { res.render('User/dashboard/school-images', {
          message: `Images must be exactly 5! You Submitted only 1`
       })}
        
      }else
       { res.render('User/dashboard/school-images', {
        message: `Images must be exactly 5! You Submitted ${file.length}`
     })}
    } else {
    function move(image) {
      try { image.mv('public/dashboard_public/social-activities/' + image.name); }
      
      catch (e) {
          return res.send({
              success: false,
              message: 'upload error'
          });
      }
      
      data.push({
          name: image.name,
          mimeType: image.mimetype,
          size: image.size
      });
  }
  
  Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);
 
  
  (await db.query('INSERT into user_social_activities_image SET img_1_s = ?, img_2_s = ?, img_3_s = ?, img_4_s = ?, img_5_s = ?, user_id = ?',[data[0].name,data[1].name,data[2].name,data[3].name,data[4].name, user.user_id]))
        req.flash('success_msg', 'Photos of Social Activities Created Successfully!');          
        res.redirect('/user/dashboard')
  
  }
  
  }}))
  
}

//school Uniforms 
exports.postCreateSchoolUniforms = async (req, res, next) => {
  
  const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];

(await db.query('SELECT user_id from user_uniforms_image WHERE user_id = ?', [user.user_id], async (err, results) => {
  if (err) {
      console.log(err);
  }
  if (results.length > 0) {
      return res.render('User/dashboard/school-images', {
         message: 'Data Cannot be created Twice!'
      })
      
    } else { if (!req.files) {
      return res.render('User/dashboard/school-images', {
        message: 'No Image Uploaded!'
     })
  }
  const file = req.files.images;
      const data = [];
  
  
  // if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
    
    if (file.length !== 5){
      if ( typeof file.length == 'undefined'){
        { res.render('User/dashboard/school-images', {
          message: `Images must be exactly 5! You Submitted only 1`
       })}
        
      }else
       { res.render('User/dashboard/school-images', {
        message: `Images must be exactly 5! You Submitted ${file.length}`
     })}
    } else {
    function move(image) {
      try { image.mv('public/dashboard_public/school-uniforms/' + image.name); }
      
      catch (e) {
          return res.send({
              success: false,
              message: 'upload error'
          });
      }
      
      data.push({
          name: image.name,
          mimeType: image.mimetype,
          size: image.size
      });
  }
  
  Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);
 
  
  (await db.query('INSERT into user_uniforms_image SET img_1_u = ?, img_2_u = ?, img_3_u = ?, img_4_u = ?, img_5_u = ?, user_id = ?',[data[0].name,data[1].name,data[2].name,data[3].name,data[4].name, user.user_id]))
        req.flash('success_msg', 'Photos of Uniforms Created Successfully!');          
        res.redirect('/user/dashboard')
  }}}))
 
}

//transport system
exports.postCreateTransportSystem = async (req, res, next) => {
  
  
const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];

(await db.query('SELECT user_id from user_transport_system_images WHERE user_id = ?', [user.user_id], async (err, results) => {
  if (err) {
      console.log(err);
  }
  if (results.length > 0) {
    return res.render('User/dashboard/school-images', {
      message: 'Data Cannot be created Twice!'
   })
      
    } else {  if (!req.files) {
      return res.render('User/dashboard/school-images', {
        message: 'No Image Uploaded!'
     })
  }
  const file = req.files.images;
      const data = [];
  
  
  // if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
    
    if (file.length !== 5){
      if ( typeof file.length == 'undefined'){
        { res.render('User/dashboard/school-images', {
          message: `Images must be exactly 5! You Submitted only 1`
       })}
        
      }else
       { res.render('User/dashboard/school-images', {
        message: `Images must be exactly 5! You Submitted ${file.length}`
     })}
    } else {
    function move(image) {
      try { image.mv('public/dashboard_public/school-transport-system/' + image.name); }
      
      catch (e) {
          return res.send({
              success: false,
              message: 'upload error'
          });
      }
      
      data.push({
          name: image.name,
          mimeType: image.mimetype,
          size: image.size
      });
  }
  
  Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);
  
  (await db.query('INSERT into user_transport_system_images SET img_1_ts = ?, img_2_ts = ?, img_3_ts = ?, img_4_ts = ?, img_5_ts = ?, user_id = ?',[data[0].name,data[1].name,data[2].name,data[3].name,data[4].name, user.user_id]))
        req.flash('success_msg', 'Photos of Transport System Created Successfully!');          
        res.redirect('/user/dashboard')
  
  }}}))

}

//get update  Advanced schoool Info
exports.getUpdateSchoolAdvancedInfo = async (req, res, next) => {
  res.render('User/dashboard/school-update-advanced-info')
}

//post update  Advanced schoool Info
exports.postUpdateSchoolAdvancedInfo = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

  const {  school_website, address, mobile_phone_a, google_map_location, ghanapost_address, landmark, subjects_offered, courses_offered, fee_info,  } = req.body;
 
  
  (await db.query('UPDATE user SET school_website = ?, address = ?, mobile_phone_a = ?, google_map_location = ?, ghanapost_address = ?, landmark = ?, subjects_offered = ?, courses_offered = ?, fee_info = ? WHERE user_id = ?',[school_website, address, mobile_phone_a, google_map_location, ghanapost_address, landmark, subjects_offered, courses_offered, fee_info, user.user_id]))
  
  req.flash('success_msg', 'School Information Modified Successfully!');        
      res.redirect('/user/dashboard')
}

//post update school facilities
exports.postUpdateSchoolFacilities = async (req, res, next) => {
    
  if (!req.files) {
    return res.send({
        success: false,
        message: 'No image uploaded!'
    });
}
const file = req.files.images;
    const data = [];

    function sharpF(image) {
      sharp(image).resize({ width: 150 }).toFile('../public/dashboard_public/test-2/1.jpg')
    }

// if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
  
  if (file.length !== 10){
    res.render('User/dashboard/school-images-update', {
      message: `Images must be exactly 10!`
   })
  } else {
  function move(image) {
  
    try { image.mv('public/dashboard_public/school-facilities/' + image.name);
   }
    
    catch (e) {
        return res.send({
            success: false,
            message: 'upload error'
        });
    }
    
    data.push({
        name: image.name,
        mimeType: image.mimetype,
        size: image.size
    });
}

Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);
console.log(data)


const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];


const sql2 = 'SELECT user_id FROM user_facilities_image WHERE user_id = ?'
const AllUserIDs = ( await queryParamPromise(sql2, [user.user_id]))

if (AllUserIDs.length == 0){
  return res.render('User/dashboard/school-images-update', {
    message: 'Information Error, Create First'
 })
}else {
  
(await db.query('UPDATE user_facilities_image SET img_1_f = ?, img_2_f = ?, img_3_f = ?, img_4_f = ?, img_5_f = ?, img_6_f = ?, img_7_f = ?, img_8_f = ?, img_9_f = ?, img_10_f = ? WHERE user_id = ?',[data[0].name,data[1].name,data[2].name,data[3].name,data[4].name,data[5].name,data[6].name,data[7].name,data[8].name,data[9].name,user.user_id]))

req.flash('success_msg', 'Photos of Facilties Updated Successfully!');          
res.redirect('/user/dashboard')

}
}

}

//post update social activities
exports.postUpdateSchoolSocialActivities = async (req, res, next) => {
  if (!req.files) {
    return res.send({
        success: false,
        message: 'No image uploaded!'
    });
}
const file = req.files.images;
    const data = [];
console.log(file);

// if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
  
  if (file.length !== 5){
    res.render('User/dashboard/school-images-update', {
      message: `Images must be exactly 5!`
   })
  } else {
  function move(image) {
    try { image.mv('public/dashboard_public/social-activities/' + image.name); }
    
    catch (e) {
        return res.send({
            success: false,
            message: 'upload error'
        });
    }
    
    data.push({
        name: image.name,
        mimeType: image.mimetype,
        size: image.size
    });
}

Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);

const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];

const sql2 = 'SELECT user_id FROM user_facilities_image WHERE user_id = ?'
const AllUserIDs = ( await queryParamPromise(sql2, [user.user_id]))

if (AllUserIDs == 0){
  return res.render('User/dashboard/school-images-update', {
    message: 'Information Error, Create First'
 })
}
else {
  (await db.query('UPDATE user_social_activities_image SET img_1_s = ?, img_2_s = ?, img_3_s = ?, img_4_s = ?, img_5_s = ? WHERE user_id = ?',[data[0].name,data[1].name,data[2].name,data[3].name,data[4].name, user.user_id]))
        req.flash('success_msg', 'Photos of Social Activities Updated Successfully!');          
        res.redirect('/user/dashboard')
  }
}

}

//post update school uniforms
exports.postUpdateSchoolUniforms = async (req, res, next) => {
   
  if (!req.files) {
    return res.send({
        success: false,
        message: 'No image uploaded!'
    });
}
const file = req.files.images;
    const data = [];


// if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
  
  if (file.length !== 5){
    res.render('User/dashboard/school-images-update', {
      message: `Images must be exactly 5!`
   })
  } else {
  function move(image) {
    try { image.mv('public/dashboard_public/school-uniforms/' + image.name); }
    
    catch (e) {
        return res.send({
            success: false,
            message: 'upload error'
        });
    }
    
    data.push({
        name: image.name,
        mimeType: image.mimetype,
        size: image.size
    });
}

Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);


const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];


const sql2 = 'SELECT user_id FROM user_facilities_image WHERE user_id = ?'
const AllUserIDs = ( await queryParamPromise(sql2, [user.user_id]))

if (AllUserIDs.length == 0){
  return res.render('User/dashboard/school-images-update', {
    message: 'Information Error, Create First'
 })
}

else {
  (await db.query('UPDATE user_uniforms_image SET img_1_u = ?, img_2_u = ?, img_3_u = ?, img_4_u = ?, img_5_u = ? WHERE user_id = ?',[data[0].name,data[1].name,data[2].name,data[3].name,data[4].name, user.user_id]))
req.flash('success_msg', 'Photos of Uniforms Updated Successfully!');          
res.redirect('/user/dashboard')
}

}
}

//post update transport system
exports.postUpdateTransportSystem = async (req, res, next) => {
  
  if (!req.files) {
    return res.send({
        success: false,
        message: 'No image uploaded!'
    });
}
const file = req.files.images;
    const data = [];


// if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
  
  if (file.length !== 5){
    res.render('User/dashboard/school-images-update', {
      message: `Images must be exactly 5!`
   })
  } else {
  function move(image) {
    try { image.mv('public/dashboard_public/school-transport-system/' + image.name); }
    
    catch (e) {
        return res.send({
            success: false,
            message: 'upload error'
        });
    }
    
    data.push({
        name: image.name,
        mimeType: image.mimetype,
        size: image.size
    });
}

Array.isArray(file) ? file.forEach((file) => move(file)) : move(file);

const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];

const sql2 = 'SELECT user_id FROM user_facilities_image WHERE user_id = ?'
const AllUserIDs = ( await queryParamPromise(sql2, [user.user_id]))

if (AllUserIDs.length == 0){
  return res.render('User/dashboard/school-images-update', {
    message: 'Information Error, Create First'
 })
}


else {
  (await db.query('UPDATE user_transport_system_images SET img_1_ts = ?, img_2_ts = ?, img_3_ts = ?, img_4_ts = ?, img_5_ts = ? WHERE user_id = ?',[data[0].name,data[1].name,data[2].name,data[3].name,data[4].name, user.user_id]))
  req.flash('success_msg', 'Photos of Transport System Updated Successfully!');          
  res.redirect('/user/dashboard')

}

}
}

exports.getSchoolSettings = async (req, res, next) => {

  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

  res.render('User/dashboard/school-settings', { user: user })
}

//Student Controllers


//Register a student page
exports.getRegisterStudent = (req, res, next) => {
  res.render('User/dashboard/register-student')
}  
//Send registered Informtion to server
exports.postRegisterStudent = async (req, res, next) => {
  const { student_name, dob, gender, parent_name, address, parent_mobile_number, old_school_fee, school_name, student_class } = req.body;

  const sqlDatetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');

 
  if (!req.files)
  return res.status(400).send('No files were uploaded.');
  
let student_image = req.files.student_image;
let img_name = student_image.name;
if (student_image.mimetype == "image/jpeg" ||student_image.mimetype == "image/png"||student_image.mimetype == "image/gif" ){
  
 student_image.mv('public/dashboard_public/student_image/'+student_image.name, function(err) {
      if (err)
      return res.status(500).send(err)})
      let errors = [];
      
      const sql = 'SELECT * FROM user WHERE user_id = ?';
      const user = (await queryParamPromise(sql, [req.user]))[0];

      const sql1 = db.query('INSERT INTO student SET ?', {
        student_name: student_name,
        dob: dob,
        gender: gender,
        parent_name: parent_name,
        address: address,
        parent_mobile_number: parent_mobile_number,
        student_image: img_name,
        user_id: user.user_id,
        date_added: sqlDatetime,
        old_school_fee: old_school_fee,
        school_name: school_name.toUpperCase(),
        student_class: student_class
      })
  
  req.flash('success_msg', 'Student Details Registered Sucessfully!');     
  res.redirect('/user/dashboard');            
    
      } else {
 res.json('image Extension not supported')
   
}

}

//Display Update Form
exports.getUpdateStudent = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

  (await db.query('SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ? AND student_id = ?', [user.user_id, req.params.id ] , (err, results) => {
    if (!err){
      res.render('User/dashboard/update-student', {userData: results})
    }else {
      console.log(err);
    }
}))
  
}

//Send student Update Information To Server
exports.postUpdateStudent = async (req, res, next) => {
  const { student_name, dob, parent_name, address, parent_mobile_number, old_school_fee } = req.body;
 
  var sqlDatetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
  
      const sql = 'SELECT * FROM user WHERE user_id = ?';
      const user = (await queryParamPromise(sql, [req.user]))[0];
      
      (await db.query('UPDATE student SET student_name = ?, dob = ?, parent_name = ?, address = ?, parent_mobile_number = ?, date_modified = ?, old_school_fee = ?, new_school_fee = ? WHERE user_id = ? AND student_id = ?',[student_name, dob, parent_name, address, parent_mobile_number, sqlDatetime, old_school_fee, 0, user.user_id, req.params.id]))
      
      req.flash('success_msg', 'Student Information Modified Successfully!');        
      res.redirect('/user/tables')
  
     
}

//view student info page
exports.getStudentView = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

  await db.query('SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ? AND student_id = ?',[user.user_id, req.params.id], (err, results) => {
    if (!err) {
      res.render('User/dashboard/view-student', {
        userData: results
      });
    }else {
      console.log(err);
    }
  })
}

//Search for student in database
exports.findStudent = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

  let searchTerm = req.body.search; 

  (await db.query('SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE student_name LIKE ? AND user_id = ?', ['%' + searchTerm + '%', user.user_id], (err, rows) => {
    
    if (!err) {
         res.render('User/dashboard/tables', { userData: rows})
         }else {
           console.log(err);
        }
       }))
}
//Delete a Student From Database with ID
exports.postDeleteStudent = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];
  
  sql1= 'DELETE FROM student WHERE student_id = ? AND user_id = ?';
  (await db.query(sql1, [req.params.id, user.user_id], (err, rows) => {
    if (!err) {
  req.flash('success_msg', 'Student Details Deleted!');     
  res.redirect('/user/dashboard');   
}else {
  console.log(err);
}
  }))
}
//Display Student School Fee With Table
exports.displayCurrentSchoolFeeWithTable = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

 (await db.query('SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ?',[user.user_id], (err, rows) => {
    console.log(rows.length)
    res.render('User/dashboard/tables', { userData: rows })
  }))
  
 
}
//Display Student with Pending School Fee
exports.displayStudentWithPendingSchoolFee = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];


  (await db.query('SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student HAVING current_fees > 0' ,(err, rows) => {
  if (!err) {
    
    res.render('User/dashboard/students-with-pending-school-fee', { userData: rows })
  }   
  }))
}

//Search for student in database with pending SChool Fee
exports.findStudentWithPendingSchoolFee = async (req, res, next) => {
  let searchTerm = req.body.search; 
  
  (await db.query('SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE student_name LIKE ? HAVING current_fees > 0', ['%' + searchTerm + '%'], (err, rows) => {
    
    if (!err) {
      res.render('User/dashboard/students-with-pending-school-fee', { userData: rows})
    }else {
      console.log(err);
    }
  }))
  
}

//send student details to server/database
exports.postUpdateStudentProfilePhoto =  async (req, res, next) =>{
 
  if (!req.files)
  return res.status(400).send('No Image Found!');

let student_image = req.files.student_image;
let img_name = student_image.name;

if(student_image.mimetype == "image/jpeg" ||student_image.mimetype == "image/png"||student_image.mimetype == "image/gif" ){
  
 student_image.mv('public/dashboard_public/student_image/'+student_image.name, function(err) {
      if (err)
      return res.status(500).send(err)})
      let errors = [];
      const sql = 'SELECT * FROM user WHERE user_id = ?';
      const user = (await queryParamPromise(sql, [req.user]))[0];

      (await db.query('UPDATE student SET student_image = ? WHERE user_id = ? AND student_id = ?',[ img_name, user.user_id, req.params.id]))
      
      req.flash('success_msg', 'Student Profile Photo Modified Successfully!');        
      res.redirect('/user/tables')
  
      } else {
 res.json('image Extension not supported')
  }      
}

//pay student school fee
exports.getPaySchoolFee = async (req, res, next) => {
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

  (await db.query('SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ? AND student_id = ?', [user.user_id, req.params.id ] , (err, results) =>{
    if (!err) {
      res.render('User/dashboard/school-fee-payment', {userData: results})

    }else {
      console.log(err);
    }
  }))

}

//send information to server/database
exports.postPaySchoolFee = async (req, res, next) => {
  const { new_school_fee, payment_date, payee_name, payee_mobile_phone } = req.body;
 
  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];
      
      (await db.query('UPDATE student SET new_school_fee = ?, payment_date = ?, payee_name = ?, payee_mobile_phone = ? WHERE user_id = ? AND student_id = ?',[new_school_fee, payment_date, payee_name, payee_mobile_phone, user.user_id, req.params.id]))

      await db.query('SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ? AND student_id = ?',[user.user_id, req.params.id], (err, results) => {
        if (!err) {
      req.flash('success_msg', 'School Fee Modified Successfully!');        
          console.log(results);
          res.render('User/dashboard/payment-and-receipt', {
            userData: results
          });
        }else {
          console.log(err);
        }
      })
      
  
}

//Display student Data Sheet 
exports.getStudentsDataSheet = async (req, res, next) => {

  const sql = 'SELECT * FROM user WHERE user_id = ?';
  const user = (await queryParamPromise(sql, [req.user]))[0];

//Get School Name
const sqlSchool = user.name

  //Get Total Number of students
 const sql1 = 'SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ?'
 const result1 = (await(queryParamPromise(sql1, [user.user_id])))

//Get Total Number of Male Students
const sql2 = 'SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ? AND gender = ?' 
const result2 = (await(queryParamPromise(sql2, [user.user_id, 'Male'])))


//Get Total Number of Female Students
const sql3 = 'SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ? AND gender = ?' 
const result3 = (await(queryParamPromise(sql3, [user.user_id, 'Female'])))


//Get Total Number of Students With Pending School Fee
const sql4 = 'SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ? HAVING current_fees > 0' 

//Getting total pending school fee of all students in the school
const result4 = (await(queryParamPromise(sql4, [user.user_id])))
let counter = 0;

for (let i = 0; i < result4.length; i++){
  counter += result4[i].current_fees

}
console.log(counter);
//Get Total Number of Students With Full School Fee
const sql5 = 'SELECT *, (old_school_fee - new_school_fee) as current_fees FROM student WHERE user_id = ? HAVING current_fees = ? ' 
const result5 = (await(queryParamPromise(sql5, [user.user_id, 0])))


let data = [results = { schoolName: sqlSchool, r1: result1.length, r2: result2.length, r3: result3.length, r4: result4.length, r5:  result5.length, pending: counter }]

console.log(data)
    res.render('User/dashboard/student-data-sheet', { userData: data })
  
  
}
//Blogs

exports.getBlog = (req, res, next) => {
    res.render('User/dashboard/blogs/index')
}

exports.postBlog = async (req, res, next) => {
const sql = 'SELECT * FROM user WHERE user_id = ?';
const user = (await queryParamPromise(sql, [req.user]))[0];

const { title, content, author } = req.body;
const user_id = user.user_id

if (!req.files){
req.flash('error_msg', 'Add Photo!');  
return res.redirect('/user/blog-site');

} else {
let blog_image = req.files.blog_image
console.log(blog_image)
let img_name = blog_image.name
console.log(img_name);


const sqlDatetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');

if (blog_image.mimetype == "image/jpeg" ||blog_image.mimetype == "image/png"||blog_image.mimetype == "image/gif" ){
  
  blog_image.mv('public/dashboard_public/blog-images/' + img_name, function(err) {
       if (err)
       return res.status(500).send(err)})
       let errors = [];
        
       const sql1 = db.query('INSERT INTO blogs SET ?', {
         title: title,
        content: content,
        author: author,
        blog_img: img_name,
        date_created: sqlDatetime,
        user_id: user_id
       })
   
   req.flash('success_msg', 'Blog Published Sucessfully!');     
   res.redirect('/user/dashboard');            
     
       } else {
        req.flash('error_msg', 'image Extension not supported!');  
        return res.redirect('/user/blog-site');
       }
 }
}

