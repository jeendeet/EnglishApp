const Video = require ('../models/Videos')
const {createNewVideo,createTest1,createTestScript1} = require('../../util/youtube');
const {wordGetData,wordListGetData} = require('../../util/api/dictionaryRequestAPI');

class VideoController {
    //[GET] /videos/:slug
    show(req,res,next) {
        if(req.query.api){
            Video.findOne({slug: req.params.slug})
                .then(video => res.json(video))
                .catch(next)
        }
        else{
            Video.findOne({ slug: req.params.slug }).lean()
                .then(video => res.render('video', { video }))
                .catch(next)
        }
    }

    //[GET] /Videos/create
    create(req,res,next) {
        createNewVideo(req.params.slug)
        res.send('Create successfully');
    }
    //[GET] /Videos/:slug/test1
    test1(req,res,next) {
        Video.findOne({ slug: req.params.slug }).lean()
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
                        res.render('videotest1', { test1 })
                    })
                }
            )
            .catch(next)
    }
    //[GET] /Videos/:slug/test1Check
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