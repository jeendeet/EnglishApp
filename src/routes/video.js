const express = require('express')
const route = express.Router()

const videoController = require('../app/controllers/VideoController')

// route.get('/doTest1', videoController.doTest1)
// route.get('/doTest2', videoController.doTest2)
route.get('/tag/:tag', videoController.getByTag)

route.get('/create/:slug', videoController.create)
route.get('/test1/:id', videoController.test1)
route.get('/test1check/:id', videoController.test1Check)
route.get('/:id', videoController.show)


module.exports = route 