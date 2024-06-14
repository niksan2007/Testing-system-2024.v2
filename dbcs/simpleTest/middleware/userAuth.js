const isLogin = async(req,res,next)=>{
    try {
        if (req.session.token_user) {
            next();
        }
        else {
            if (req.session.token_lecturer){
                res.redirect('/home_lecturer')
            }else{
                res.redirect('/');
            }   
        }
    } catch (error) {
        console.log("Несанкционированный доступ");
        if (req.session.token_lecturer){
            res.redirect('/home_lecturer')
        }else{
            res.redirect('/');
        } 
    }
}


module.exports = isLogin