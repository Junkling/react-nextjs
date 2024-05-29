const passport = require('passport');
const local = require('./local');
const {User} = require('../models');
//노드에서는 얘가 소셜 로그인도 대신해줌
module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async(id, done)=>{
        //Spring Security의 authentication 설정과 같은 느낌
        try{
            const findUser = await User.findOne({where: {id}})
            done(null, findUser);
        }catch(error){
            console.error(error);
            done(error);
        }
    });

    local();
}