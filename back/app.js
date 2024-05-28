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
const app = express();
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
app.post('/api/post', (req, res) => {
    // res.json('작성 완료')
    // or
    res.json({ id : 200 , content: '생성된 게시글'})
});
app.delete('/api/post', (req, res) => {
    res.json({ id : 100 , content: '게시글 삭제'})
});
app.listen(3065, () => {console.log('서버 실행 중')})