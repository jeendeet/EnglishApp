const express = require('express')
const route = express.Router()

const videoController = require('../app/controllers/VideoController')

// route.get('/doTest1', videoController.doTest1)
// route.get('/doTest2', videoController.doTest2)
route.get('/create/:slug', videoController.create)
route.get('/:slug/test1', videoController.test1)
route.get('/:slug/test1check', videoController.test1Check)
route.get('/:slug', videoController.show)


module.exports = route 