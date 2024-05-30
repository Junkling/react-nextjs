const express = require('express');

const {Post, Image, User, Comment} = require('../models');
const router = express.Router()



router.get('/', async (req, res, next)=>{
    try{
        const posts = await Post.findAll({
            // where: {id: lastId},
            // offset: 0,
            limit: 10,
            order: [
                ['createdAt','DESC'],
                ['Comments', 'createdAt', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
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