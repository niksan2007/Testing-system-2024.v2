const isLogin = async(req,res,next)=>{
    try {
        if (req.session.token_lecturer) {

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
        if (req.session.token_lecturer) {
            res.redirect('/home_lecturer');
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