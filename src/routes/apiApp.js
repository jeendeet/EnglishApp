const express = require('express')
const route = express.Router()

const apiController = require('../app/controllers/ApiController')

route.get('/user/id/:id', apiController.getUserByID)
route.get('/user/email/:email', apiController.getUserByEmail)
route.post('/user/login-authen', apiController.userLoginAuthen)
// route.post('/user/signup', apiController.userSignup)

route.get('/videos/all', apiController.getVideoAll)
// route.get('/videos/news', apiController.getVideoNew)
// route.get('/videos/polular', apiController.getVideoPolular)
route.get('/videos/tag/:tag', apiController.getVideoByTag)
route.get('/videos/id/:id', apiController.getVideoByID)
route.get('/videos/test/id/:id', apiController.getVideoTestByID)

module.exports = route 