const Video = require ('../models/Videos')
const History = require ('../models/History')
const User = require ('../models/User')

const {createNewVideo,createTest1,createTestScript1} = require('../../util/youtube');
const {wordGetData,wordListGetData} = require('../../util/api/dictionaryRequestAPI');
const request = require('request');
const fs = require('fs');

class VideoController {
    //[GET] /videos/tag/:tag
    getByTag(req,res,next) {
        if(req.query.api){
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
        else{
            Video.findOne({ slug: req.params.slug }).lean()
                .then(video => res.render('video', { video }))
                .catch(next)
        }
    }
    //[GET] /videos/news
    getByNews(req,res,next) {
        if(req.query.api){
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
        else{
            Video.findOne({ slug: req.params.slug }).lean()
                .then(video => res.render('video', { video }))
                .catch(next)
        }
    }
    //[GET] /Videos/create
    async create(req,res,next) {
        await createNewVideo(req.params.slug)
        res.send('Success');
    }
    //[GET] /videos/:id?uid
    show(req,res,next) {
        User.findOne({ _id: req.query.uid }).lean()
            .then(user => {
                Video.findOne({ _id: req.params.id }).lean()
                    .then(video => {
                        res.render('video', { video:video, user:user, path:"auth" })
                    })
                    .catch(next)
            })
            .catch(next)
    }
    //[GET] /Videos/test1/:id?uid
    test1(req,res,next) {
        User.findOne({ _id: req.query.uid }).lean()
            .then(user => {
                Video.findOne({ _id: req.params.id })
                    .then(video => {
                        video.views = parseInt(video.views) +1;
                        video.save();
                        let test1 ={}
                        console.log("Start create test")
                        const scriptTest = createTestScript1(video.script);
                        test1.name = video.name;
                        test1.description = video.description;
                        test1._id = video._id;
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
                                res.render('videotest1', { test1:test1,user:user,path:"auth" })
                            })
                        }
                    )
                    .catch(next)
            })
            .catch(next)
    }
    //[GET] /Videos/test1Check/:id
    test1Check(req,res,next) {

        var output = {
            key   : "",
            val : "",
            check   : "",
          };
          
          // Khởi tạo mảng
        let outputs =[];
        const formData = req.query;
        let i = 0;
        let countTrue = 0;

        for(let key in req.query){
            outputs[i] = {}
            outputs[i].key = key
            outputs[i].val = req.query[key]
            if(outputs[i].key == outputs[i].val){
                outputs[i].check = 'true'
                countTrue = countTrue+1;
            }else{
                outputs[i].check = false
            }
            console.log(outputs[i])
            i=i+1
        }
        res.send(outputs)
    }
}
module.exports = new VideoController
