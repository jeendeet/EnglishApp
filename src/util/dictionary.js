var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request({
    uri: 'http://www.giantbomb.com/api/search',
    qs: {
      api_key: '123456',
      query: 'World of Warcraft: Legion'
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body)
      }
    }
  });
});
function wordGetData(word){
    
}
module.exports = {wordGetData};