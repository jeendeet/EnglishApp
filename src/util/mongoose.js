const { default: mongoose } = require("mongoose")

module.exports = {
    multipleMongooseToObject : function(docs){
        return docs.map(doc => doc.toObject())
    },
    mongooseToObject : function(doc){
        return doc? doc.toObject : doc
    }
}