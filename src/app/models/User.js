const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    fullname: {type: String,  maxLength : 250},
    email: {type: String,  maxLength : 250},
    password: {type: String,  maxLength : 250},
    status: {type: String,  maxLength : 250},
    exspiredDate: {type: Date},
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", User);