const isLogin = async(req, res, next) => {
    try {
        if (req.session.token_admin) {

        } else {
            res.redirect('/admin');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }

};

const isLogout = async(req, res, next) => {
    try {
        if (req.session.token_admin) {
            res.redirect('/admin/home');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }

};

module.exports = {
    isLogin,
    isLogout
}