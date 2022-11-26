const {User} = require('../models/User');

let auth = (req, res, next) => {
    // 로그인 인증처리 진행 미들웨어
    let token = req.cookies.x_auth;
    // 클라이언트 쿠키에서 토큰 갖고 옴
    // 토큰 복호화 후 해당 유저를 db에서 찾는다.
    User.findByToken(token, (err, userInfo) => {
        if (err) {
            throw err;
        }else if(!userInfo){
            return res.json({isAuth : false, error : true})
        }else{
            req.token = token;
            req.user = userInfo;
            // 모든 인증과정을 거쳤으면, 다음 기능이 실행되게 해준다.
            next();
        }
    })
    // 유저가 존재하면 인증 ok
    // 유저가 일치하지 않으면 No
}

module.exports = {auth};