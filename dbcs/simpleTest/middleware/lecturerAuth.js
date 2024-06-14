const isLogin = async(req,res,next)=>{
    try {
        if (req.session.token_lecturer) {
            next();
        } 
        else {
            if (req.session.token_user){
                res.redirect('/home')
            }else{
                res.redirect('/');
            } 
        }
    } catch (error) {
        console.log("Не санкционированный доступ");
        if (req.session.token_user){
            res.redirect('/home')
        }else{
            res.redirect('/');
        } 
    }
}


module.exports = isLogin