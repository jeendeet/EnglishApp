const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://user:%4012345@cluster0.hsng33t.mongodb.net/')
        console.log('Connected!');
    } catch (error){
        console.log('Connect DB Err!');
    }
}

module.exports = {connect}