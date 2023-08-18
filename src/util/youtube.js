const VideoApp = require ('../app/models/Videos')
const { YoutubeTranscript } = require('youtube-transcript');
var fetchVideoInfo = require('updated-youtube-info');

function createTranscript(scripts){
    let script_n = '';
    for(let i = 0; i< scripts.length; i++){
        script_n = script_n + scripts[i].text;
    }
    return script_n
}

async function createNewVideo(idYoutube){
    const VideoData = {idVid:idYoutube};
    const video = new VideoApp(VideoData);
    video.save();
    YoutubeTranscript.fetchTranscript(idYoutube)
        .then(function (scripts){
            console.log("Start get script", idYoutube);
            console.log(scripts)
            VideoApp.findOne({idVid:idYoutube})
                .then(video => { 
                    video.script = createTranscript(scripts);
                    video.save();
                })
            console.log("script done");
        })
        .catch(console.error)
    fetchVideoInfo(idYoutube)
        .then(function (videoInfo) {
            console.log("Start fetch meta data", idYoutube);
            console.log(videoInfo);
            VideoApp.findOne({idVid:idYoutube})
                .then(video => {
                    video.name = videoInfo.title;
                    video.description = "videoInfo description";
                    video.img = videoInfo.thumbnailUrl;
                    video.slug = idYoutube;
                    video.views = 0;
                    video.save();
                })
            console.log("Stop fetch meta data", idYoutube);
        })
        .catch(console.error);
}
function createTestScript1(script){
    let html = ''
    let valReturn = {}
    var stringToSplit = script;
    let newScript = script;
    var stringSplitted = stringToSplit.split(' ')
    var numOfTotalBlank = (stringSplitted.length/10)
    var blank = []
    // console.log(numOfTotalBlank)
    for(let i=1; i<numOfTotalBlank; i++){
        // console.log(stringSplitted[i*5])
        newScript=newScript.replace(' ' + stringSplitted[i*10] + ' ', '___('+i+')____')
        blank[i-1] = stringSplitted[i*10]
    }
    valReturn.script = script
    valReturn.newScript = newScript
    valReturn.listBlank = blank
    // console.log(valReturn)
    return valReturn
}
function createTest1(idYoutube){
    let retval = {}
    VideoApp.findOne({idVid:idYoutube})
        .then(video => {
            console.log("Start create test")
            const scriptTest = createTestScript1(video.script);
            retval.name = video.name;
            retval.description = video.description;
            retval.slug = video.slug;
            retval.testScript = scriptTest.newScript;
            retval.blanks = scriptTest.listBlank;
            console.log("End create test")
            return retval;
        }) 
        .catch(console.error); 
}

module.exports = {createNewVideo,createTest1,createTestScript1}