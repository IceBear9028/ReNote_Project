// prod : 배포했을 때 몽고db uri 지정
// dev : 로컬에서의 몽고 db uri 지정

if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}