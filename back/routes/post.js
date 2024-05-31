//@RequestMapping("/post") 같은 개념으로 기능별 쪼개기

const express = require('express')
const multer = require('multer');
const path = require('path')
const fs = require('fs')
const {Post, Comment, Image, User, Hashtag} = require('../models');
const {isLoggedIn} = require('./middleware');

const router = express.Router();

try{
    fs.accessSync('uploads')
}catch(err){
    console.log('uploads 폴더 생성')
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + '_' +  new Date().getTime() + ext);
        }
    }),
    limits: {fileSize: 20 * 1024 * 1024},
});
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next)=> {
    console.log(req.files);
    res.json(req.files.map((v)=> v.filename));
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    // res.json('작성 완료')
    // or
    try{
        const savedPost = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(req.body.image){
            const images = await Promise.all([].concat(req.body.image).map((i) => {
                Image.create({
                    src: i,
                    PostId: savedPost.id,
                    UserId: req.user.id,
                })
            }));
            await savedPost.addImages(images)
        }
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        if(hashtags){
            const hashResult = await Promise.all(hashtags.map((i)=> Hashtag.findOrCreate({
                where: {name: i.slice(1).toLowerCase(),}
            })));
            await savedPost.addHashtags(hashResult.map((v) => v[0]))
        }
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
                attributes: ['id', 'nickname']
            },{
                model: User,
                as: 'Hearters',
                attributes: ['id']
            },{
                model: Hashtag,
            },]
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
router.post(`/:postId/retweet`, isLoggedIn , async(req, res, next)=>{
    try{
        const findPost = await Post.findOne({
            where: {id: req.params.postId}, 
            include: [{
                model: Post,
                as: 'Retweet',
            }]}
        );
        if(!findPost){ 
            return res.status(400).send('해당하는 게시물이 없습니다.');
        }
        if(req.user.id === findPost.UserId || (findPost.Retweet && findPost.Retweet.UserId === req.user.id)){
            return res.status(400).send('자신의 게시물은 리트윗 할 수 없습니다.');
        }
        const retweetId = findPost.RetweetId || findPost.id;
        const existRetweet = await Post.findOne({
            where:{RetweetId: retweetId, UserId: req.user.id}
        })
        if(existRetweet){
            return res.status(400).send('이미 리트윗한 게시물 입니다.');
        }
        const savedRetweet = await Post.create({
            content: 'retweet',
            UserId: req.user.id,
            RetweetId: retweetId,
        })
        const retweetedOrignPost = await Post.findOne({
            where: {id: savedRetweet.id},
            include: [{
                model: Post,
                as: 'Retweet',
                include:[
                    { model: User, attributes: ['id', 'nickname'], },
                    { model: Image, as: 'Images'},
                ]
            },{
                model: User,
                attributes: ['id', 'nickname'],
            },{
                model: Image,
                as: 'Images',
            },{
                model: Comment, 
                as: 'Comments',
                include:[
                    { model: User, attributes: ['id', 'nickname'], }
                ]
            },{
                model: User,
                as: 'Hearters',
                attributes: ['id']
            }]
        })
        res.status(200).json(retweetedOrignPost);
    }catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;