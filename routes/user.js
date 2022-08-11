const express = require('express')
const userController = require('../controllers/user')
const { requireAuth, forwardAuth } = require('../middlewares/userAuth');
const badRequest = require('../controllers/errorRedirect')

const router = express.Router()

//user Routes

//user login Page
router.get('/login', forwardAuth, userController.getUserLogin )
router.post('/login', userController.postUserLogin)

//user register Page
router.get('/register', forwardAuth, userController.getUserRegister)
router.post('/register', userController.postUserRegister)

//user dashboard
router.get('/dashboard', requireAuth, userController.getUserDashboard)


//view User Update Page
router.get('/update-user/:id', requireAuth, userController.getUpdateUser)

//send the information to the server
router.post('/update-user/:id', requireAuth, userController.postUpdateUser)

//get user Profile Picture
router.get('/dashboard', requireAuth, userController.getUserProfilePicture)

//post user profile picture
router.post('/dashboard', requireAuth, userController.postUserProfilePicture)

//school settings
router.get('/school-settings', requireAuth, userController.getSchoolSettings)

//school images route
router.get('/school-images', requireAuth, userController.getSchoolImages)
//school images update route
router.get('/school-images-update', requireAuth, userController.getUpdateSchoolImages)

//ALL GET REQUEST TO OTHER IMAGE ROUTES//All Routes being redirected to School settings
router.get('/school-facilities', requireAuth, badRequest.error)
router.get('/social-activities', requireAuth, badRequest.error)
router.get('/school-uniforms', requireAuth, badRequest.error)
router.get('/school-transport-system', requireAuth, badRequest.error)
router.get('/school-facilities-update', requireAuth, badRequest.error)
router.get('/social-activities-update', requireAuth, badRequest.error)
router.get('/school-uniforms-update', requireAuth, badRequest.error)
router.get('/school-transport-system-update', requireAuth, badRequest.error)

//schools facilities images
router.post('/school-facilities', requireAuth, userController.postCreateSchoolFacilitiesImages)

//School's Social Activities
router.post('/social-activities', requireAuth, userController.postCreateSchoolSocialActivities)

//School's Uniforms
router.post('/school-uniforms', requireAuth, userController.postCreateSchoolUniforms)

//School's Transport System
router.post('/school-transport-system', requireAuth, userController.postCreateTransportSystem)

//post school-update-advanced-info
router.post('/school-update-advanced-info', requireAuth, userController.postUpdateSchoolAdvancedInfo)

//get School Facilities Update Info
router.get('/school-update-advanced-info', requireAuth, userController.getUpdateSchoolAdvancedInfo)

//post update school facilities
router.post('/school-facilities-update', requireAuth, userController.postUpdateSchoolFacilities)

//post update social activities
router.post('/social-activities-update', requireAuth, userController.postUpdateSchoolSocialActivities)

//post update school uniforms
router.post('/school-uniforms-update', requireAuth, userController.postUpdateSchoolUniforms)

//post update transport system
router.post('/school-transport-system-update', requireAuth, userController.postUpdateTransportSystem)


// user logout
router.get('/logout', requireAuth, userController.getUserLogOut);



//Students Routes

//register student
router.get('/register-student', requireAuth, userController.getRegisterStudent)
router.post('/register-student', requireAuth, userController.postRegisterStudent)

//view student page
router.get('/student-view/:id', requireAuth, userController.getStudentView)

//Display current School Fee of Student with table information
router.get('/tables', requireAuth, userController.displayCurrentSchoolFeeWithTable)

//Display  students with pending school fee
router.get('/pending-school-fee', requireAuth, userController.displayStudentWithPendingSchoolFee)

//view the update student page
router.get('/update-student/:id', requireAuth, userController.getUpdateStudent)

//Send the information to server/database
router.post('/update-student/:id', requireAuth, userController.postUpdateStudent)

//Update student Profile Photo
router.post('/update-student-profile/:id', requireAuth, userController.postUpdateStudentProfilePhoto)

//Delete a student record
router.get('/delete-student/:id', requireAuth, userController.postDeleteStudent)

// search student
router.post('/tables', requireAuth, userController.findStudent)

//search student with pending school fee
router.post('/pending-school-fee', requireAuth, userController.findStudentWithPendingSchoolFee)

//student payment form
router.get('/pay-school-fee/:id', requireAuth, userController.getPaySchoolFee)
//send info to server/database
router.post('/pay-school-fee/:id', requireAuth, userController.postPaySchoolFee)

//display student data sheet 
router.get('/student-data-sheet', requireAuth, userController.getStudentsDataSheet)
router.all('*', badRequest.all404Requests)
module.exports = router