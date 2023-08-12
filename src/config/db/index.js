const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/database_nodeJS_Learn')
        console.log('Connected!');
    } catch (error){
        console.log('Connect DB Err!');
    }
}

module.exports = {connect}