const express = require('express')
const route = express.Router()

const siteController = require('../app/controllers/SiteController')

// route.get('/topview', siteController.contact)
route.get('/', siteController.index)

module.exports = route 