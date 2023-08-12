const {wordGetData,wordListGetData} = require('../../util/api/dictionaryRequestAPI')

class WordController {
    //[GET] /word/:slug
    show(req,res) {
        console.log(req.params.slug);
        wordGetData(req.params.slug)
            .then(data =>{
                console.log(data);
                res.json(data);
            })
            .catch(err=>{
                console.log(err)  
            })

        // const words = ["hello", "go", "happy"]
        // wordListGetData(words)
        //     .then(data =>{
        //         console.log(data)
        //         res.json(data);
        //     })
        //     .catch(err=>{
        //         console.log(err)  
        //     })
    }
}
module.exports = new WordController
