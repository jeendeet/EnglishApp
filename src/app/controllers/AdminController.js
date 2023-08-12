const VideoApp = require ('../models/Videos')
const {mongooseToObject,multipleMongooseToObject} = require('../../util/mongoose')
const {createNewVideo,createTest1,createTestScript1} = require('../../util/youtube');
class SiteController {
    //[GET] /videos
    showVideos(req,res,next) {
        VideoApp.find({})
            .then(videos => {
                videos = multipleMongooseToObject(videos)
                res.render('admin/videos',{videos})
            })
            .catch(next)
    }
    //[POST] /videos/create
    createVideos(req,res,next) {
        createNewVideo(req.body.idVid)
        res.send('Create successfully');
    }
    //[GET] /videos/:slug
    detailVideo(req,res,next) {
        VideoApp.findById({ _id: req.params.id }).lean()
            .then(video => {
                res.render('admin/video_detail',{video})
            })
            .catch(next)
    }
    //[POST] /videos/upate/:id
    updateVideo(req,res,next) {
        VideoApp.updateOne({ _id:req.params.id }, req.body)
            .then(()=>{
                VideoApp.find({})
                .then(videos => {
                    videos = multipleMongooseToObject(videos)
                    res.render('admin/videos',{videos})
                })
                .catch(next)
            })
            .catch(next)
    }
    deleteVideo(req,res,next) {
        VideoApp.deleteOne({ _id:req.params.id })
            .then(()=>{
                res.redirect('back')
            })
            .catch(next)
    }
}
module.exports = new SiteController
