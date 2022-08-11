const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    dateStrings: 'date',
    database: process.env.DB_NAME,
  });
 // Database query promises


//display the Home Page
exports.getIndex = (req, res, next) => {
      res.render('index')
}
//display the about Page
exports.getAbout = (req, res, next) => {
    res.render('about')
}
//display the Services page
exports.getServices = (req, res, next) => {
    res.render('services')
}
//display the Schools page
exports.getSchools = async (req, res, next) => {

(await db.query('SELECT * FROM user ', (err, rows) => {
    
    if (!err) {
        res.render('schools', { userData: rows })
         }else {
           console.log(err);
        }
       }))
    
}

//display the school's page with all information
exports.getSchoolDescription = async (req, res, next) => {
  (await db.query('SELECT user.*, user_facilities_image.img_1_f,user_facilities_image.img_2_f,user_facilities_image.img_3_f,user_facilities_image.img_4_f,user_facilities_image.img_5_f,user_facilities_image.img_6_f,user_facilities_image.img_7_f,user_facilities_image.img_8_f,user_facilities_image.img_9_f,user_facilities_image.img_10_f, user_social_activities_image.img_1_s, user_social_activities_image.img_2_s, user_social_activities_image.img_3_s, user_social_activities_image.img_4_s, user_social_activities_image.img_5_s, user_transport_system_images.img_1_ts, user_transport_system_images.img_2_ts, user_transport_system_images.img_3_ts, user_transport_system_images.img_4_ts, user_transport_system_images.img_5_ts, user_uniforms_image.img_1_u, user_uniforms_image.img_2_u, user_uniforms_image.img_3_u, user_uniforms_image.img_4_u, user_uniforms_image.img_5_u FROM user, user_facilities_image, user_social_activities_image, user_transport_system_images, user_uniforms_image WHERE user_facilities_image.user_id = ? AND user_social_activities_image.user_id = ? AND user_transport_system_images.user_id = ? AND user_uniforms_image.user_id = ? AND user.user_id = ? ', [req.params.id, req.params.id, req.params.id, req.params.id, req.params.id], (err, results) => {
    
    if (!err) {
      console.log(results);
       res.render('school-description', { userData: results })
         }else {
           console.log(err);
        }
       }))
}

// search schools
exports.postSearchSchools = async (req, res, next) => {
(await db.query('SELECT * FROM user WHERE name LIKE ?', ['%' + req.body.search + '%'], (err, results) => {
    
    if (!err) {
       res.render('schools', { userData: results})
         }else {
           console.log(err);
        }
       }))
}

//display the register page
exports.getLandingPage=  (req, res, next) => {
    res.render('landing')
}

exports.getError403 = (req, res, next) => {
    res.render('error403');
  }
  