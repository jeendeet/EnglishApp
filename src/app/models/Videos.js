const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const VideoApp = new Schema({
    name: {type: String,  maxLength : 250},
    idVid: {type: String,  maxLength : 250},
    slug: {type: String,  maxLength : 250},
    description: {type: String, maxLength : 600},
    img: {type: String,maxLength : 600},
    script: {type: String,maxLength : 10000},
    check: {type: String,maxLength : 2},
    views: {type: String},
    catogolory: {type: String,maxLength : 200},
    tag: {type: String,maxLength : 600},
},{
    timestamps: true,
});

module.exports = mongoose.model('VideoApp', VideoApp);