const express = require('express');
const { Op } = require('sequelize')
const {Post, Image, User, Comment, Hashtag} = require('../models');
const { isLoggedIn } = require('./middleware');
const router = express.Router()



router.get('/', async (req, res, next)=>{
    try{
        const where ={}
        if(parseInt(req.query.lastId,10)){
            where.id = {[Op.lt]: parseInt(req.query.lastId,10)}
        }
        const posts = await Post.findAll({
            where,
            // offset: 0,
            limit: 5,
            order: [
                ['createdAt','DESC'],
                ['Comments', 'createdAt', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            },{
                model: Post,
                as: 'Retweet',
                include:[
                    { model: User, attributes: ['id', 'nickname'], },
                    {model: Image, as: 'Images'},
                ]
            },{
                model: Image,
                as: 'Images'
            },{
                model: Comment,
                as: 'Comments',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            },{
                model: User,
                as: 'Hearters',
                attributes: ['id']
            }],
        })
        res.status(200).json(posts);
    }catch(err){
        console.error(err);
    }
})  
router.get('/user/:userId' ,async (req, res, next)=>{
    try{
        const findUser = await User.findOne({
            where:{ id: parseInt(req.params.userId,10) },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                as: 'Posts',
                attributes: ['id'],
            },{
                model: User,
                as: 'Followings',
                attributes: ['id'],
            },{
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        });
        if(!findUser){
            res.status(404).send("해당하는 유저가 없습니다.");
        }
        // if(![].concat(findUser.Followers).find(req.user.id)){
        //     res.status(404).send("팔로워만 조회 가능합니다.");
        // }
        const where ={UserId: parseInt(req.params.userId,10)}
        if(parseInt(req.query.lastId,10)){
            where.id = {[Op.lt]: parseInt(req.query.lastId,10)}
        }
        const posts = await Post.findAll({
            where,
            // offset: 0,
            limit: 5,
            order: [
                ['createdAt','DESC'],
                ['Comments', 'createdAt', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            },{
                model: Post,
                as: 'Retweet',
                include:[
                    { model: User, attributes: ['id', 'nickname'], },
                    {model: Image, as: 'Images'},
                ]
            },{
                model: Image,
                as: 'Images'
            },{
                model: Comment,
                as: 'Comments',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            },{
                model: User,
                as: 'Hearters',
                attributes: ['id']
            }],
        })
        res.status(200).json(posts);
    }catch(err){
        console.error(err);
        next(err);
    }
})  
router.get('/hashtag/:content' ,async (req, res, next)=>{
    try{
        const findHashtag = await Hashtag.findOne({
            where:{ name: decodeURIComponent(req.params.content) },
        });
        if(!findHashtag){
            res.status(404).send("해당하는 해쉬태그가 없습니다.");
        }
        const where ={}
        if(parseInt(req.query.lastId,10)){
            where.id = {[Op.lt]: parseInt(req.query.lastId,10)}
        }
        const posts = await Post.findAll({
            where,
            // offset: 0,
            limit: 5,
            order: [
                ['createdAt','DESC'],
                ['Comments', 'createdAt', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            },{
                model: Hashtag,
                where: {name: decodeURIComponent(req.params.content)}
            },{
                model: Post,
                as: 'Retweet',
                include:[
                    { model: User, attributes: ['id', 'nickname'], },
                    {model: Image, as: 'Images'},
                ]
            },{
                model: Image,
                as: 'Images'
            },{
                model: Comment,
                as: 'Comments',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            },{
                model: User,
                as: 'Hearters',
                attributes: ['id']
            }],
        })
        res.status(200).json(posts);
    }catch(err){
        console.error(err);
        next(err);
    }
})  

module.exports = router;