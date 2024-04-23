const express = require("express");
const user_route = express();
const session = require("express-session");
const config = require("../config/config");
const userAuth = require("../middleware/userAuth");
const lecturerAuth = require("../middleware/lecturerAuth");

user_route.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

user_route.set('view engine', 'ejs');
user_route.set('views', ['./views/users', './views/tests']);
//user_route.set('views', './views/tests');

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const multer = require("multer");
const path = require("path");
user_route.use(express.static('public')); // использование картинок и скриптов из данной папки

const storageUser = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../public/userImages'));
    },
    filename:function(req, file, cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const uploadUser = multer({storage:storageUser});

const storageTest = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../public/testImages'));
    },
    filename:function(req, file, cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const uploadTest = multer({storage:storageTest});

const userController = require("../controllers/userController");
user_route.get('/register', userAuth.isLogout, userController.loadRegister);
user_route.post('/register', uploadUser.single('image'), userController.insertUser);

user_route.get('/verify', userController.verifyMail);

user_route.get('/', userAuth.isLogout, userController.loginLoad);
user_route.get('/', lecturerAuth.isLogout, userController.loginLoad);
user_route.get('/login', userAuth.isLogout, userController.loginLoad);
user_route.get('/login', lecturerAuth.isLogout, userController.loginLoad);

user_route.get('/briefpage', lecturerAuth.isLogout, userController.briefLoad);
user_route.get('/briefpage', userAuth.isLogout, userController.briefLoad);

user_route.post('/login', userController.verifyLogin);
user_route.get('/home', userAuth.isLogin, userController.loadHome);
user_route.get('/home_lecturer', lecturerAuth.isLogin, userController.loadHome_lecturer);

user_route.get('/logout', userAuth.isLogin, userController.userLogout);
user_route.get('/logout_lec', lecturerAuth.isLogin, userController.lecturerLogout);

user_route.get('/forget', userAuth.isLogout, userController.forgetLoad);
user_route.get('/forget', lecturerAuth.isLogout, userController.forgetLoad);
user_route.post('/forget', userController.forgetVerify);

user_route.get('/forget-password', userAuth.isLogout, userController.forgetPasswordLoad);
user_route.get('/forget-password', lecturerAuth.isLogout, userController.forgetPasswordLoad);
user_route.post('/forget-password', userController.resetPassword);

user_route.get('/verification', userController.verificationLoad);
user_route.post('/verification', userController.sendVerificationLink);

user_route.get('/edit', userAuth.isLogin, userController.editLoad);
user_route.post('/edit', uploadUser.single('image'), userController.updateProfile);

user_route.get('/edit_lecturer', lecturerAuth.isLogin, userController.editLoadLecturer);
user_route.post('/edit_lecturer', uploadUser.single('image'), userController.updateProfileLecturer);

user_route.get('/watch_test', userAuth.isLogin, userController.testsPageLoad);
user_route.get('/pass-test', userAuth.isLogin, userController.showTestPage);
user_route.post('/pass-test', userController.studentAnswers);

user_route.get('/constructor', lecturerAuth.isLogin, userController.createTest);
user_route.post('/constructor', uploadTest.fields([
    {name: 'scriptSolution', maxCount: 10},
    {name: 'image', maxCount: 10},
    {name: 'scriptTable', maxCount: 10},
    {name: 'scriptTableData', maxCount: 10}]), userController.sendCreatedTest);
user_route.get('/test_status', lecturerAuth.isLogin, userController.showAllTests);

user_route.get('/edit-test', lecturerAuth.isLogin, userController.editLecturerTest);
user_route.post('/edit-test', uploadTest.fields([
    {name: 'scriptSolution', maxCount: 10},
    {name: 'image', maxCount: 10},
    {name: 'scriptTable', maxCount: 10},
    {name: 'scriptTableData', maxCount: 10}]), userController.updateTests);

user_route.get('/delete-test', userController.deleteTests);


////////////////////////////////////////////////////////////////////////////////////////



// Маршрут для отображения страницы создания обычного теста
user_route.get('/ClassicConstructor', lecturerAuth.isLogin, userController.createClassicTest);


user_route.get('/ChangeTest', lecturerAuth.isLogin, userController.createChange);






///////////////////////////////////////////////////////////////////////////////////




module.exports = user_route;