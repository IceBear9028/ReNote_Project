const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

// 자식 스키마
const childSchema = Schema({
    title : {
        type : String,
    },
    creationDate : {
        type : Date,
    },
    calendarDate : {
        type : Date,
    },
    editDate : {
        type : Date
    },
    text : {
        type : String,
    }
});

// 부모 스키마
const parentSchema = Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        required : true,
        unique : true,
    },
    documents : [childSchema]
})


const Document = mongoose.model('Document', childSchema)
const DocumentBox = mongoose.model('DocumentBox', parentSchema);

module.exports = {DocumentBox, Document}