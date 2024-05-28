const express = require('express');
const bcrypt = require('bcrypt');
const {User, Post} = require('../models');
const passport = require('passport');
const { where } = require('sequelize');
const router = express.Router();

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
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(201).send('ok');
    }catch(error){
        console.error(error);
        next(error);
    }
});

//미들웨어 확장 방식
router.post('/login', (req, res, next) => {
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
                },{
                    model: User,
                    as: 'Followings',
                },{
                    model: User,
                    as: 'Followers',
                }]
            });
            return res.status(200).json(userResponse);
        });
    })(req, res, next)
});

router.post('/logout', (req, res) => {
    req.logout(()=>{});
    req.session.destroy();
    res.send('ok');
});

module.exports = router;