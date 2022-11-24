const mongoose = require('mongoose');
const Schema = mongoose.Schema

// 회원가입시 db에 올라갈 데이터 규칙을 스키마 기능으로 생성
const userSchema = Schema({
    name : {
        type : String,
        required : true,
    },
    age : {
        type : String,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : Number,
        default : 0
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}