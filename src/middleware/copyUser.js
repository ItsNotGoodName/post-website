module.exports = (req, res, next)=>{
    if(typeof req.user !=undefined){
        res.locals.user = req.user;
    }
    return next();
}