const express = require('express')
const route = express.Router()

const hash = '1406';
const adminController = require('../app/controllers/AdminController');

route.post('/'+hash+'/videos/create', adminController.createVideos);
route.post('/'+hash+'/videos/update/:id', adminController.updateVideo);
route.get('/'+hash+'/videos/delete/:id', adminController.deleteVideo);

route.get('/'+hash+'/videos/:id', adminController.detailVideo);

route.get('/'+hash+'/videos', adminController.showVideos);

module.exports = route 
