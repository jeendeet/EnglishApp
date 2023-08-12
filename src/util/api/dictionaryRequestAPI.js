const request = require('request');
 
_EXTERNAL_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

function promise(word) {
    return new Promise (function(resole, reject){
        request(_EXTERNAL_URL + word, { json: true }, (err, res, body) => {
            if (err) { 
                return reject(err);
             }
            return resole(body);
            });
        })
} 
function wordGetData(word){
    return promise(word);
}
function wordListGetData(words) {
    let wordData = [];
    const wordCount = words.length;
    for(var i=0; i<  wordCount; i++){
        wordData[i] = promise(words[i]);
    }
    return Promise.all(wordData);
}
module.exports = {wordGetData, wordListGetData};