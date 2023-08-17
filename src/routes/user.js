const express = require('express')
const route = express.Router()

const userController = require('../app/controllers/UserController')

route.get('/login', userController.login)
route.post('/login-authen', userController.loginAuthen)
route.get('/signup', userController.signup)
route.post('/signup/create', userController.create)

module.exports = route 