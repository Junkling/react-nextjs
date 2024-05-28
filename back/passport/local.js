const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local')
const {User} = require('../models')
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },async (email, password, done)=>{
        try{
            const findUser = await User.findOne({
                where: {email}
            });
            if(!findUser){
                // done(애러 , 성공객체 , 정보)
                return done(null, false, {reason: '해당하는 회원이 없습니다.'});
            }
            const match = await bcrypt.compare(password, findUser.password);
            if(match){
                return done(null, findUser);
            }
            return done(null, false, {reason: '비밀번호가 일치하지 않습니다.'})
        }catch(error){
            console.log(error);
            return done(error);
        }
    }));
}