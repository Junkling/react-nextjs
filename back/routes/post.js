//@RequestMapping("/post") 같은 개념으로 기능별 쪼개기

const express = require('express')

const router = express.Router();
router.post

router.post('/', (req, res) => {
    // res.json('작성 완료')
    // or
    res.json({ id : 200 , content: '생성된 게시글'})
});

router.delete('/', (req, res) => {
    res.json({ id : 100 , content: '게시글 삭제'})
});
module.exports = router;