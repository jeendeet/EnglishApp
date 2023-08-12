const VideoApp = require ('../models/Videos')
const {multipleMongooseToObject} = require('../../util/mongoose')
class SiteController {
    //[GET] /
    index(req,res,next) {
        VideoApp.find({})
            .then(videos => {
                videos = multipleMongooseToObject(videos)
                res.render('home',{videos})
            })
            .catch(next)
    }
    //[GET] /contact
    contact(req,res) {
        res.render('contact')
    }

}
module.exports = new SiteController
