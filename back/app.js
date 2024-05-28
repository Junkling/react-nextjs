// 바닐라 node 코드 
// const http = require('http');
// const server = http.createServer((req, res)=>{
//     console.log(req.url, req.method);
//     if(req.method==='GET'){

//     }else if(req.method==='POST'){

//     }else if(req.method === 'DELETE'){
        
//     }
//     res.write('<h1>Hello node1</h2>')
//     res.write('<h2>Hello node2</h2>')
//     res.write('<h3>Hello node3</h3>')
//     res.write('<h4>Hello node4</h4>')
//     res.end('Hello node')
// });
// servier.listen(3065, () => {console.log('서버 실행 중')})

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync().then(()=> {console.log('db 연결 성공')}).catch(console.error)
passportConfig();
//dispatcherSevlet 의 개념 (요청을 json 타입으로 매핑, 쿼리 스트링 <-> 객체 옵션)
app.use(cors(
    {
        origin: '*',
        credentials: false,
        // origin: 'junhyuk.com'
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello express')
});
app.get('/api', (req, res) => {
    res.send('Hello api')
});
app.get('/api/posts', (req, res) => {
    //json 형식으로 응답
    res.json([
        { id: 1, content: 'post1'},
        { id: 2, content: 'post2'},
        { id: 3, content: 'post3'}
    ])
});
app.get(`/api/post`, (req, res) => {
    //json 형식으로 응답
    res.json({ id : 100 , content: '게시글 단건 조회'})
});

app.use('/user',userRouter);
app.use('/post',postRouter);
app.listen(3065, () => {console.log('서버 실행 중!!')})