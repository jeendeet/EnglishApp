const Video = require ('../models/Videos')
const User = require('../models/User');
const {createNewVideo,createTest1,createTestScript1} = require('../../util/youtube');
const {wordGetData,wordListGetData} = require('../../util/api/dictionaryRequestAPI');

class ApiController {
    //----------------------------User--------------------//
    //[GET] api/user/id/:id
    getUserByID(req,res,next) {
        let uid = req.params.id
        User.findOne({ _id:uid }).lean()
            .then(user => res.json(user))
            .catch(next)
    }
    //[GET] api/user/email/:email
    getUserByEmail(req,res,next) {
        let uEmail = req.params.email
        User.findOne({ email:uEmail }).lean()
            .then(user => res.json(user))
            .catch(next)
    }
    //[POST] api/user/login-authen
    userLoginAuthen(req, res) {
        const formData = req.body;
        let uEmail = formData.email;
        let uPassword = formData.password;
        User.findOne({email:uEmail}).lean()
            .then(user => {
                let data = {}
                if ((user.email == uEmail) && (user.password == uPassword)){
                    data.status = 'Successfull';
                    data.user   = user;
                    res.json(data);
                }
                else {
                    data.status = 'Wrong pass or mail'
                    res.json(data);
                }
            })
            .catch(err => {
                data.status = 'Not found email'
                res.json(data);
            })
    }
    //[POST] api/user/signup
    
    //----------------------------Video-------------------//
    //[GET] api/videos/all
    getVideoAll(req,res,next) {
        Video.find()
            .then(videos =>{res.json(videos)})
            .catch(next)
    }
    //[GET] api/videos/tag/:tag
    getVideoByTag(req,res,next) {
        let tag = req.params.tag
        Video.find()
            .then(videos =>{
                let tagVideos = []
                for(let video of videos){
                    if(video.tag.includes(tag)){
                        tagVideos.push(video)
                    }
                }
                res.json(tagVideos)
            })
            .catch(next)
    }
    //[GET] api/videos/id/:id
    getVideoByID(req,res,next) {
        let id = req.params.id
        Video.findOne({ _id:id }).lean()
            .then(video => res.json(video))
            .catch(next)
    }
    //[GET] api/videos/test1/:id
    getVideoTestByID(req,res,next) {
        let id = req.params.id
        Video.findOne({ _id:id }).lean()
            .then(video => {
                let test1 ={}
                console.log("Start create test")
                const scriptTest = createTestScript1(video.script);
                test1.name = video.name;
                test1.description = video.description;
                test1.slug = video.slug;
                test1.testScript = scriptTest.newScript;
                test1.blanks = scriptTest.listBlank;
                console.log(test1)
                return test1;
            })
            .then( test1 => {
                const words = ["hello", "go", "happy"]
                wordListGetData(words)
                    .then(data =>{
                        test1.Newsword = data
                        console.log(data)
                        res.json(test1)
                    })
                }
            )
            .catch(next)
    }
}
module.exports = new ApiController
