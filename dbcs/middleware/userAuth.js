const isLogin = async(req,res,next)=>{
    try {
        if (req.session.token_user) {

        } else {
            res.redirect('/home');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = async(req,res,next)=>{
    try {
        if (req.session.token_user) {
            res.redirect('/home');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogin,
    isLogout
}