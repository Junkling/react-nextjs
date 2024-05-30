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
            },
            {
                model: User,
                as: 'Hearters',
                attributes: ['id']
            }]
        })
        res.status(201).json(postResponse);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.delete(`/:postId`, isLoggedIn, async (req, res, next) => {
    try{
        const findPost = await Post.findOne({where: {id: req.params.postId}});
        if(!findPost){
            return res.status(400).send('해당 게시물은 존재하지 않는 게시물입니다.');
        }
        await Post.destroy({where: {id: req.params.postId, UserId: req.user.id,}});
        res.status(200).json({PostId: findPost.id})
    }catch(err){
        console.error(err);
        next(err);
    }
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
router.patch(`/:postId/like`, isLoggedIn , async(req, res, next)=>{
    try{
        const findPost = await Post.findOne({
            where: {id: req.params.postId}, 
            include: [{
                model: User,
                as: 'Hearters',
                attributes: ['id']
            }]}
        );
        if(!findPost){ 
            return res.status(400).send('해당하는 게시물이 없습니다.');
        }
        const liked = findPost.Hearters.find((v) => v.id===req.user.id);
        if(liked){
            return res.status(400).send('이미 좋아요 누른 게시물입니다.');
        }
        // const savedHeart = await Heart.create({
        //     PostId: req.params.postId,
        //     UserId: req.user.id,
        // })
        // res.status(201).json(savedHeart);
        await findPost.addHearters(req.user.id);
        res.status(200).json({PostId: findPost.id, UserId: req.user.id});
    }catch(err){
        console.error(err);
        next(err);
    }
})
router.delete(`/:postId/like`, isLoggedIn , async(req, res, next)=>{
    try{
        const findPost = await Post.findOne({
            where: {id: req.params.postId}, 
            include: [{
                model: User,
                as: 'Hearters',
                attributes: ['id']
            }]}
        );
        if(!findPost){ 
            return res.status(400).send('해당하는 게시물이 없습니다.');
        }
        const liked = findPost.Hearters.find((v) => v.id===req.user.id);
        if(!liked){
            return res.status(400).send('아직 좋아요 누르지 않은 게시물입니다.');
        }
        await findPost.removeHearters(req.user.id);
        res.status(200).json({PostId: findPost.id, UserId: req.user.id});
    }catch(err){
        console.error(err);
        next(err);
    }
})
module.exports = router;