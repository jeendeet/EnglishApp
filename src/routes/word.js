const express = require('express')
const route = express.Router()

const wordController = require('../app/controllers/WordController')

route.get('/:slug', wordController.show)


module.exports = route 