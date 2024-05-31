const express = require('express');
const bcrypt = require('bcrypt');
const {User, Post} = require('../models');
const passport = require('passport');
const { where } = require('sequelize');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middleware')

// async , await을 통해 비동기 처리에서의 순차적으로 실행 시키게 한다.
router.post('/', async (req, res, next) => {
    try{
        const findUser = await User.findOne({
            where: {email : req.body.email,}
        });
        if(findUser){
            return res.status(403).send("중복된 이메일 입니다.");
        }
        const encodedPassword = await bcrypt.hash(req.body.password,10);
        await User.create({
            email: req.body.email,
            password: encodedPassword,
            nickname: req.body.nickname,
        });
        // res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(201).send('ok');
    }catch(error){
        console.error(error);
        next(error);
    }
});

//미들웨어 확장 방식
router.post('/login', isNotLoggedIn , (req, res, next) => {
    passport.authenticate('local',(err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            console.log(info);
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr)=>{
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            // res.setHeader('Cookie', 'cxlhy')
            const userResponse = await User.findOne({
                where:{ id: user.id },
                // attributes: ['id', 'nickname', 'email']
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
            return res.status(200).json(userResponse);
        });
    })(req, res, next)
});

router.post('/logout', isLoggedIn, (req, res) => {
    // req.logout(()=>{res.redirect('/')});
    req.session.destroy();
    res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try{
        await User.update({nickname: req.body.nickname},{where:{id: req.user.id}});
        const findUser = await User.findOne({
                where: {id: req.user.id},
            attributes: {
                exclude: ['password']
            },
        });
        res.status(200).json(findUser);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.patch('/follow/:userId', isLoggedIn, async (req, res, next) => {
    try{
        const findUser = await User.findOne({where:{id: req.params.userId}});
        if(!findUser){
            return res.status(400).send('존재하지 않는 회원입니다.');
        }
        await findUser.addFollowes(req.user.id);
        // const me = await User.findOne({
        //     where:{id: req.user.userId},
        //     attributes: {
        //         exclude: ['password']
        //     },
        //     include:[{
        //         model: User,
        //         as: 'Followings',
        //         attributes: ['id','nickname']
        //     }]
        // })
        res.status(200).json({UserId : parseInt(req.params.userId)});
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.delete('/follow/:userId', isLoggedIn, async (req, res, next) => {
    try{
        const findUser = await User.findOne({where:{id: req.params.userId}});
        await findUser.removeFollowers(req.user.id);
        if(!findUser){
            return res.status(400).send('존재하지 않는 회원입니다.');
        }
        // const me = await User.findOne({
        //     where:{id: req.user.userId},
        //     attributes: {
        //         exclude: ['password']
        //     },
        //     include:[{
        //         model: User,
        //         as: 'Followings',
        //         attributes: ['id','nickname']
        //     }]
        // })
        res.status(200).json({UserId : parseInt(req.params.userId)});
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.get('/followings', isLoggedIn, async(req, res, next)=> {
    try{
        const findUser = await User.findOne({where:{id: req.user.id}});
        const myFollowings = await findUser.getFollowings({
            attributes:['id','nickname']
        });
        res.status(200).json(myFollowings);
    }catch(err){
        console.error(err);
        next(err);
    }
})
router.get('/followers', isLoggedIn, async(req, res, next)=> {
    try{
        const findUser = await User.findOne({where:{id: req.user.id}});
        const myFollowers = await findUser.getFollowers({
            attributes:['id','nickname']
        });
        res.status(200).json(myFollowers);
    }catch(err){
        console.error(err);
        next(err);
    }
})

router.get('/', async (req, res, next) => {
    try{
        if(req.user){
            const userResponse = await User.findOne({
                where:{ id: req.user.id },
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
            return res.status(200).json(userResponse);
        }else{
            res.status(200).json(null);
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;