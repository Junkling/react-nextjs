//@RequestMapping("/post") 같은 개념으로 기능별 쪼개기

const express = require('express')
const {Post, Comment, Image, User} = require('../models')
const {isLoggedIn} = require('./middleware')

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    // res.json('작성 완료')
    // or
    try{
        const savedPost = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const postResponse = await Post.findOne({
            where: {id: savedPost.id},
            include: [{
                model: Image,
                as: 'Images',
            },{
                model: Comment, 
                as: 'Comments',
            },{
                model: User,
            }]
        })
        res.status(201).json(postResponse);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.delete('/', isLoggedIn, (req, res) => {
    res.json({ id : 100 , content: '게시글 삭제'})
});

router.post(`/:postId/comment`, isLoggedIn, async (req, res, next) => {
    // res.json('작성 완료')
    // or
    try{
        const findPost = await Post.findOne({
            where: {id: req.params.postId}
        });
        if(!findPost){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const savedComment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        });
        const commentResponse = await Comment.findOne({
            where:{id: savedComment.id},
            include: [{
                model: User,
                attributes : ['id' , 'nickname']
            }],
        })
        res.status(201).json(commentResponse);
    }catch(err){
        console.error(err);
        next(err);
    }
});
module.exports = router;