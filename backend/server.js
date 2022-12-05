const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./config/key');
const {User} = require('./models/User');
const {DocumentBox, Document} = require('./models/Document');

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

app.get('/api/test', (req, res) => {
    res.send('안녕?');
})

// 회원가입시 필요한 정보들을 프론트엔드에서 갖고오면
// 해당 데이터를 데이터베이스에 저장
app.post('/api/users/register', (req,res) => {
    // req 에는 프론트앤드에서 받아온 데이터가 담김
    // -> 필요한 body 데이터를 받게 해주는 것이 bodyParser 덕분
    const user = new User(req.body);
    // 받아온 데이터를 유저 모델에 저장한다.
    // -> db에 user 라는 컬렉션이 생성된다.
    user.save((err,userInfo) => {
        // 갖고오는데 에러가 생기면 클라이언트에 다음과 같은 json 데이터를 보낸다.
        if (err){
            console.log(err)
            return res.json({
                success : false ,
                error : err,
                text : "이미 가입한 아이디입니다."
            })
        }else{
            // 이후, 바로 다른 DB에 해당유저의 documentBox 를 하나 생성한다
            console.log(user);
            User.findOne({email : req.body.email}, (err, userInfo) => {
                const documentBox = new DocumentBox({'user_id' : userInfo._id}, (err) => {
                    if(err){return res.json({error : err})}
                });
                documentBox.save((err, docBox) =>{
                    if(err){
                        return res.json({error : err});
                    }else{
                        return res.json({success : true});
                    }
                })
            })
        }
    })
})

// 로그인 기능
app.post('/api/users/login', (req, res) => {
    // 요청한 정보를 db에서 뒤져본다.
    User.findOne({email : req.body.email},(err, userInfo) => {
        if(!userInfo){
            return res.json({
                loginSuccess : false,
                message : "죄송합니다. 해당하는 id 가 존재하지 않습니다."
            })
        }else{
            // 해당 아이디의 비밀번호도 맞는지 확인
            if(userInfo.password === req.body.password){
                userInfo.generateToken((err, userInfo) => {
                    if(err){
                        return res.status(400).send(err)
                    }else{
                        return res.cookie("x_auth", userInfo.token).status(200).json({
                            loginSuccess : true,
                            userId : userInfo._id
                        })
                    }
                })
            }else{
                console.log(req.body)
                return res.json({
                    loginSuccess : false,
                    message : "해당 id의 비밀번호가 틀립니다."
                })
            }
        }
    })
})

// 로그인되어있는 동안 토큰의 인증절차를 확인한다.
// 클라이언트받은 쿠키를 통해서 로그인 상태를 확인
app.get('/api/users/auth', auth, (req,res) => {
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        role : req.user.role
    })
})

// 로그아웃 기능
app.get('/api/users/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id : req.user._id}, {token : ""}, (err, userInfo) => {
        if(err){
            return res.status(400).json({ success : false, error : err })
        }else{
            return res.status(200).json({ success : true })
        }
    })
})

//새로운 유저도큐멘트 생성
app.post('/api/document/createDocument', (req, res) => {
    DocumentBox.findOne({user_id : req.body.user_id}, (err, docBox) => {
        if(err){
            return res.json('예상치 못한 문제가 발생하였습니다.');
        }else{
            // 에러 없이 도큐멘트들이 생성
            // 1. 부모도큐먼트가 불러지고 자식 도큐먼트가 들어가는 경우
            docBox.documents.push(new Document(req.body, (err, documentInfo) => {
                if(err){
                    return res.json({
                        success : false,
                        text : '죄송합니다. 추후에 다시 일정을 추가해주세요'
                    });
                }
            }));
            docBox.save((err, docBoxInfo) => {
                if(err){
                    return res.json({
                        success : false,
                        text : '예상치 못한 문제로 저장이 되지 않았습니다. 다시 저장버튼을 눌러주세요',
                        error : err
                    })
                }else{
                    return res.json({
                        success : true,
                        text : '일정이 정상적으로 저장되었습니다.'
                    })
                }
            })
        }
    })
})

// documentbox 안의 도큐먼트들 다 갖고 오기
app.get('/api/document/findDocumentAll', (req, res) => {
    DocumentBox.findOne({user_id : req.body.user_id}, (err, docBoxInfo) => {
        if(err){
            return res.json({
                success : false,
                error : err,
                text : '예상치 못한 오류가 발생하였습니다.'
            })
        }else{
            return res.json({
                success : true,
                docs : docBoxInfo.documents
            })
        }
    })
})

// 선택한 일정을 수정


// 선택한 일정을 삭제



app.listen(port, () => {
    console.log(`app listening on port : ${port}`);
})