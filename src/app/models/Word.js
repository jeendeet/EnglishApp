const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Word = new Schema({
    uid: {type: String,  maxLength : 250},
    total: {type: Array},
    favour: {type: Array},
    alarm: {type: Object},
}, {
    timestamps: true,
})

module.exports = mongoose.model("Word", Word);