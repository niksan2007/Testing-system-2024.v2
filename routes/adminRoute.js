const express = require("express");
const admin_route = express();
const session = require("express-session");
const config = require("../config/config");
const adminAuth = require("../middleware/adminAuth");

admin_route.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

const bodyParser = require("body-parser");
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));

admin_route.set('view engine', 'ejs');
admin_route.set('views', './views/admin');

const multer = require("multer");
const path = require("path");
admin_route.use(express.static('public')); // использование картинок из папки

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../public/userImages'));
    },
    filename:function(req, file, cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const upload = multer({storage:storage});
const adminController = require("../controllers/adminController");

admin_route.get('/', adminAuth.isLogout, adminController.loadLogin);
admin_route.post('/', adminController.verifyLogin);

admin_route.get('/home', adminAuth.isLogin, adminController.loadDashboard);
admin_route.get('/logout', adminAuth.isLogin, adminController.logout);
admin_route.get('/forget', adminAuth.isLogout, adminController.forgetLoad);
admin_route.post('/forget', adminController.forgetVerify);
admin_route.get('/forget-password', adminAuth.isLogout, adminController.forgetPasswordLoad);
admin_route.post('/forget-password', adminController.resetPassword);

admin_route.get('/dashboard', adminAuth.isLogin, adminController.adminDashboard);
admin_route.get('/new-lecturer', adminAuth.isLogin, adminController.newLecturerLoad);
admin_route.post('/new-lecturer', upload.single('image'), adminController.addLecturer);
admin_route.get('/edit-user', adminAuth.isLogin, adminController.editLecturerLoad);
admin_route.post('/edit-user', adminController.updateUsers);
admin_route.get('/delete-user', adminController.deleteUsers);
admin_route.get('/export-users', adminAuth.isLogin, adminController.exportUsers);
admin_route.get('*', function(req, res) {
    res.redirect('/admin');
});

module.exports = admin_route;