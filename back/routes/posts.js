const express = require('express');
const { Op } = require('sequelize')
const {Post, Image, User, Comment} = require('../models');
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

module.exports = router;