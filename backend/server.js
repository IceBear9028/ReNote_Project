const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./config/key');
const {User} = require('./models/User');
const {auth} = require('./middleware/auth');
const port = 6003;

mongoose.connect(config.mongoURI,{
}).then(() => {
    console.log('connect mongoDB')
}).catch((error)=>{console.log(error)})


// bodyparser 모듈 적용
// 클라이언트에서 받은 정보들을 분석해서 사용할 수 있게 해줌
// urlencoded -> url을 갖고오게 함 
// json -> json 데이터를 갖고오게 함
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('hello 는 시발')
})

// 회원가입시 필요한 정보들을 프론트엔드에서 갖고오면
// 해당 데이터를 데이터베이스에 저장
app.post('/api/users/register', (req,res) => {
    // req 에는 프론트앤드에서 받아온 데이터가 담김
    // -> 필요한 body 데이터를 받게 해주는 것이 bodyParser 덕분
    const user = new User(req.body)
    // 받아온 데이터를 유저 모델에 저장한다.
    // -> db에 user 라는 컬렉션이 생성된다.
    user.save((err,userInfo) => {
        // 갖고오는데 에러가 생기면 클라이언트에 다음과 같은 json 데이터를 보낸다.
        if (err){
            return res.json({ sucess : false })
        }
        console.log(user);
        return res.status(200).json({ sucess : true })
    })
})

// 로그인 기능
app.post('/api/users/login', (req, res) => {
    // 요청한 정보를 db에서 뒤져본다.
    User.findOne({email : req.body.email},(err, userInfo) => {
        if(!userInfo){
            res.json({
                loginSucess : false,
                message : "죄송합니다. 해당하는 id 가 존재하지 않습니다."
            })
        }else{
            // 해당 아이디의 비밀번호도 맞는지 확인
            if(userInfo.password === req.body.password){
                userInfo.generateToken((err, userInfo) => {
                    if(err){
                        res.status(400).send(err)
                    }else{
                        res.cookie("x_auth", userInfo.token).status(200).json({
                            loginSucess : true,
                            userId : userInfo._id
                        })
                    }
                })
            }else{
                console.log(req.body)
                res.json({
                    loginSucess : false,
                    message : "비밀번호 틀림"
                })
            }
        }
    })
})

app.get('get/users/auth', auth, (req,res) => {

})



app.listen(port, () => {
    console.log(`app listening on port : ${port}`);
})