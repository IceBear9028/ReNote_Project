const express = require('express');
const app = express();
const port = 6003;
const bodyParser = require('body-parser');
const {User} = require('./models/User');

// 몽고DB 연결 코드
// 몽고 DB 유저 id : lsy875
// 비번 : tlatms9028
// 1000, 2000 포트는 이미 사용중임.
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userRegister:12345@renotedb.xfnopip.mongodb.net/?retryWrites=true&w=majority',{
    // useUnifiedTopology : true, useCreateIndex : true, useFindAndModuify : true
}).then(() => {
    console.log('connect mongoDB')
}).catch((error)=>{console.log(error)})

// bodyparser 모듈 적용
// 클라이언트에서 받은 정보들을 분석해서 사용할 수 있게 해줌
// urlencoded -> url을 갖고오게 함 
// json -> json 데이터를 갖고오게 함
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hello 는 시발')
})

// 회원가입시 필요한 정보들을 프론트엔드에서 갖고오면
// 해당 데이터를 데이터베이스에 저장
app.post('/register', (req,res) => {
    // req 에는 프론트앤드에서 받아온 데이터가 담김
    // -> 필요한 body 데이터를 받게 해주는 것이 bodyParser 덕분
    const user = new User(req.body)

    // 받아온 데이터를 유저 모델에 저장한다.
    user.save((err,doc) => {
        // 갖고오는데 에러가 생기면 클라이언트에 다음과 같은 json 데이터를 보낸다.
        if (err){
            console.log(doc)
            console.log(err)
            return res.json({ sucess : false })}
        // if (req.body.id === null){
        //     return res.json({ sucess : false })}
        return res.status(200).json({ sucess : true })
    })
})


app.listen(port, () => {
    console.log(`app listening on port : ${port}`);
})