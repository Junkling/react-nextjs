exports.isLoggedIn = (req, res, next)=> {
    if(req.isAuthenticated()){
        //다음 미들웨어로 보냄
        next();
    }else{
        res.status(401).send('로그인이 필요한 서비스 입니다.');
    }
}
exports.isNotLoggedIn = (req, res, next)=> {
    if(!req.isAuthenticated()){
        //다음 미들웨어로 보냄
        next();
    }else{
        res.status(401).send('로그인 하지 않은 사용자만 접근 가능합니다.');
    }
}