const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');


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
    },
    token : {
        type : String
    }
});

userSchema.methods.generateToken = function(callback){
    // 1. 이 메소드가 실행되는 순간, 이 메소드가 담긴 오브젝트 전체가 userInfo 라는 이름으로 바인딩 된다.
    const userInfo = this;

    // 2. 토큰 생성 후, 이 메소드가 담긴 오브젝트(이 메소드 자신이 속해있는 오브젝트)에 token 라는 이름으로 속성을 만들고 토큰을 저장한다
    const token = jwt.sign(userInfo._id.toHexString(), 'secretToken');
    userInfo.token = token;

    // 3. 이 메소드 자신이 속해있는 오브젝트의 save 메소드를 실행시키며, callback 함수에 input 값으로 보낸다.
    // -> save 메소드 실행중에 에러 발생시, callback 함수에 err 만 전달하고 callback 을 실행시킨다.
    // -> save 메소드가 잘 작동했을 때, callback 함수에 null, userInfo 전달하고 callback 을 실행시킨다.
    userInfo.save(function(err, userInfo){
        if(err){
            callback(err);
        }else{
            callback(null, userInfo);
        }
    })
};

userSchema.statics.findByToken = function(token, callback){
    var userInfo = this;

    // 클라이언트에서 받은 토큰과 db에서 받은 토큰이 일치하는지 확인하는 함수
    jwt.verify(token, 'secretToken',   function(err, decoded){
        userInfo.findOne({"_id" : decoded, "token" : token}, function(err, userInfo){
            if(err){
                callback(err);
            }else{
                callback(null, userInfo);
            }
        })
    })
}


const User = mongoose.model('User', userSchema);

module.exports = {User}