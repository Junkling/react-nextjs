const passport = require('passport');
const local = require('./local')
//노드에서는 얘가 소셜 로그인도 대신해줌
module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async(id, done)=>{
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