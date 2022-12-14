const express = require('express')
const homeController = require('../controllers/home')
const { getIp } = require('../middlewares/get-Ip')
const router = express.Router()

router.get('/', getIp, homeController.getIndex)
router.get('/about', getIp, homeController.getAbout)
router.get('/blogs', getIp, homeController.getBlogs)
router.get('/article/:id', getIp, homeController.getArticle)
router.get('/schools', getIp, homeController.getSchools)
router.get('/index', getIp, homeController.getLandingPage)
router.get('/unauthorized', getIp, homeController.getError403)

//route for searching schools 
router.post('/schools', homeController.postSearchSchools)

//display the school's page with all information
router.get('/schools-view/:id', getIp,  homeController.getSchoolDescription)


module.exports = router
