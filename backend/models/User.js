const mongoose = require('mongoose');

// 회원가입시 db에 올라갈 데이터 규칙을 스키마 기능으로 생성
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        maxLength : 20,
    },
    lastname : {
        type : String,
        maxLength : 10,
    },
    email : {
        type : String,
        trim : true,
        // trim : 문자열의 공백을 없애는 기능을 한다.
        unique : 1,
    },
    password : {
        type : String,
        maxLength : 30
    },
    // 페이지 관리자와 일반 유저를 구별하기 위한 용도
    // 관리자를 따로 지정하지 않으면, 일반 유저로 0을 지정한다.
    role : {
        type : Number,
        default : 0
    },
    // 토큰을 통해서 회원가입 상태를 저장한다.
    token : {
        type : String,
    },
    // 토큰의 저장기간을 정한다.
    tokenExp : {
        type : Number
    }
});

const User = mongoose.model('User', userSchema)

module.exports = {User}