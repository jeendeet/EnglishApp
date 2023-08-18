const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const History = new Schema({
    uid: {type: String,  maxLength : 250},
    email: {type: String,  maxLength : 250},
    dataName: {type: String,  maxLength : 250},
    subName: {type: String,  maxLength : 250},
    id:{type: String,  maxLength : 250},
    value:{type: String,  maxLength : 25},
}, {
    timestamps: true,
})

module.exports = mongoose.model("History", History);