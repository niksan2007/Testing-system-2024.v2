/*
Исходники на Github
https://github.com/ComradeWayne/Testing-system-2023
*/

const User = require('../models/userModel');
const Test = require('../models/testModel');
const ReplyStud = require('../models/replyStudModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const config = require('../config/config');
const fs = require('fs');

const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


////////////////////////////////////////////////////

//То что было добавлено мной


const createChange = async(req, res)=>{
    try {
        res.render('ChangeTest');
    } catch (error) {
        console.log(error.message);
    };
};


const createClassicTest = async(req, res)=>{
    try {
        res.render('ClassicConstructor');
    } catch (error) {
        console.log(error.message);
    };
};
const renderResultsPage = async (req, res) => {
    try {
        const lecturerId = req.session.token_lecturer;

        if (!lecturerId) {
            return res.status(403).send('Доступ запрещен');
        }

        const replies = await ReplyStud.find({ lector_id: lecturerId });
        const uniqueTestTopics = Array.from(new Set(replies.map(reply => reply.info_test[0]?.test_topic)))
            .filter(topic => topic !== null);

        res.render('Results', { testTopics: uniqueTestTopics });
    } catch (error) {
        console.error('Ошибка при рендеринге страницы результатов:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};



// Получить учеников, прошедших тест по определенной теме
const getStudentsByTestTopic = async (req, res) => {
    try {
        const { testTopic } = req.params;

        // Найти всех учеников, прошедших тест по указанной теме
        const students = await ReplyStud.aggregate([
            { $match: { "info_test.test_topic": testTopic } },
            {
                $lookup: {
                    from: "users",
                    localField: "stud_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: "$stud_id",
                    name: "$user.name",
                    surname: "$user.surname",
                    group: "$user.group_name",
                    correctAnswers: { $arrayElemAt: ["$quantity.correct_ans", 0] },
                    totalQuestions: { $add: [{ $arrayElemAt: ["$quantity.correct_ans", 0] }, { $arrayElemAt: ["$quantity.incorrect_ans", 0] }] },
                    percentage: {
                        $multiply: [
                            { $divide: [{ $arrayElemAt: ["$quantity.correct_ans", 0] }, { $add: [{ $arrayElemAt: ["$quantity.correct_ans", 0] }, { $arrayElemAt: ["$quantity.incorrect_ans", 0] }] }] },
                            100
                        ]
                    }
                }
            }
        ]);

        // Отправить данные об учениках в ответе
        res.render('studentsByTestTopic', { students: students, testTopic: testTopic });
    } catch (error) {
        console.error('Ошибка при получении данных об учениках:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};



//////////////////////////////////////////////


const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
};




const sendVerifyMail = async(name, email, user_id)=> {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'Подтверждение аккаунта',
            html: '<p> Здравствуй, ' + name + '. Необходимо перейти по ссылке и <a href="http://127.0.0.1:3000/verify?id=' + user_id + '"> Подтвердить</a> вашу почту. </p>'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log("Письмо было отправлено", info.response);
            }
        });


    } catch (error) {
        console.log(error.message);
    }
};

const sendResetPasswordMail = async(name, email, token_pass)=> {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'Восстановление пароля',
            html: '<p> Здравствуй, ' + name + '. Ссылка для <a href="http://127.0.0.1:3000/forget-password?token_pass=' + token_pass + '"> восстановления</a> вашего пароля. </p>'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log("Письмо было отправлено", info.response);
            }
        });


    } catch (error) {
        console.log(error.message);
    }
};

const loadRegister = async(req,res)=>{
    try {
        res.render('registration');
    } catch (error) {
        console.log(error.message);
    }
};

const insertUser = async(req, res)=>{
    try {
        const spassword = await securePassword(req.body.password);
        const preCheck = await User.findOne({email:req.body.email});
        if (req.file == undefined) {
            var data_image = null;
        } else {
            var data_image = req.file.filename;
        }

        const user = new User({
            surname:req.body.surname,
            name:req.body.name,
            patronim:req.body.patronim,
            group_name:req.body.group_name,
            email:req.body.email,
            password:spassword,
            image:data_image,
            is_admin:0,
            is_lecturer:0
        });
        const userData = await user.save();
        console.log("Данные при регистрации");
        console.log(req.body);
        console.log(req.file);
        if (preCheck == null && req.body.password.length >= 6) {
            sendVerifyMail(req.body.name, req.body.email, userData._id);

            postsObject = {
                posts: [
                         {state: "Регистрация успешна", note: "Проверьте почту для подтверждения аккаунта"},
                ]
            }

            res.render('registration', {message: "Регистрация успешна.", posts: postsObject});
        
        } else if (preCheck == null && req.body.password.length < 6) {
            postsObject = {
                posts: [
                         {state: "Регистрация провалена", note: "Некорректный пароль"},
                ]
            }

            res.render('registration', {message: "Регистрация провалена.", posts: postsObject});
            const delUser = await User.findByIdAndDelete(userData._id);

        } else if (preCheck.email === req.body.email && preCheck.is_verified === 1) {
            postsObject = {
                posts: [
                         {state: "Регистрация провалена", note: "Такая почта существует в базе"},
                ]
            }

            res.render('registration', {message: "Регистрация провалена.", posts: postsObject});
            const delUser = await User.findByIdAndDelete(userData._id);

        } else {
            postsObject = {
                posts: [
                         {state: "Регистрация провалена", note: "Возникли неполадки"},
                ]
            }

            res.render('registration', {message: "Регистрация провалена.", posts: postsObject});
            const delUser = await User.findByIdAndDelete(userData._id);
        }
    } catch (error) {
        console.log(error.message);
    }
};

const verifyMail = async(req, res)=>{
    try {
        const updateInfo = await User.updateOne({_id:req.query.id}, { $set: { is_verified: 1 }});
        console.log(updateInfo);
        res.render("emailVerified");

    } catch (error) {
        console.log(error.message);
    }
};

const loginLoad = async(req, res)=>{
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
};

const briefLoad = async(req, res)=>{
    try {
        res.render('briefpage');
    } catch (error) {
        console.log(error.message);
    }
};

const verifyLogin = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({ email: email });
        console.log("req.body", req.body);
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                if (userData.is_verified === 0) {
                    res.render('login', { message: "Пожалуйста подтвердите почту" });
                } else if (userData.is_verified === 1 && userData.is_lecturer === 0 && userData.is_admin === 0) {
                    req.session.token_user = userData._id;
                    console.log(`Студент ${userData.surname} ${userData.name} ${userData.group_name} начал сессию в сервисе`);
                    console.log(`Его токен req.session.token_user = ${req.session.token_user}`);
                    res.redirect('/home');
                } else if (userData.is_verified === 1 && userData.is_lecturer === 1 && userData.is_admin === 0) {
                    req.session.token_lecturer = userData._id;
                    console.log(`Преподаватель ${userData.surname} ${userData.name} начал сессию в сервисе`);
                    console.log(`Его токен req.session.token_lecturer = ${req.session.token_lecturer}`);
                    res.redirect('/home_lecturer');
                } else {
                    res.render('login', { message: "Некорректный пароль" });
                }
            } else {
                res.render('login', { message: "Некорректный пароль" });
            }
        } else {
            res.render('login', { message: "Такой учётной записи не существует в базе" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Внутренняя ошибка сервера");
    }
};

const loadHome = async(req, res)=>{
    try {
        const userData = await User.findById({ _id: req.session.token_user });
        res.render('home', { user: userData });
    } catch (error) {
        console.log(error.message);
    }
};

const loadHome_lecturer = async(req, res)=>{
    try {
        const userData = await User.findById({ _id: req.session.token_lecturer });
        res.render('home_lecturer', { user: userData });
    } catch (error) {
        console.log(error.message);
    }
};

const userLogout = async(req,res)=> {
    try {
        console.log(`Студент с токеном req.session.token_user = ${req.session.token_user} закончил сессию в сервисе`);
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }
};

const lecturerLogout = async(req,res)=> {
    try {
        console.log(`Преподаватель с токеном req.session.token_lecturer = ${req.session.token_lecturer} закончил сессию в сервисе`);
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }
};

const forgetLoad = async(req, res)=>{
    try {
        res.render('forget');
    } catch (error) {
        console.log(error.message);
    }
};

const forgetVerify = async(req, res)=>{
    try {
        const email = req.body.email;
        const userData = await User.findOne({email:email});
        if (userData) {
            if (userData.is_verified === 0) {
                res.render('forget', {message: "Необходимо подтвердить почту"});
            } else {
                const randomString = randomstring.generate();
                const updatedData = await User.updateOne({email:email}, {$set: {token_pass:randomString}});
                sendResetPasswordMail(userData.name, userData.email, randomString);
                res.render('forget', {message: "Письмо для смены пароля отправлено"});
            }
        } else {
            res.render('forget', {message: "Такая почта не существует в базе"});
        }
    } catch (error) {
        console.log(error.message);
    }
};

const forgetPasswordLoad = async(req, res)=> {
    try {
        const token_pass = req.query.token_pass; // получаем токен пароля из самой URL ССЫЛКИ.
        const tokenData = await User.findOne({token_pass:token_pass});
        if (tokenData) {
            res.render('forget-password', {user_id: tokenData._id});
        } else {
            res.render('rotten_egg', {message: "Протухший токен"});
        }
    } catch (error) {
        console.log(error.message);
    }
};

const resetPassword = async(req, res)=>{
    try {
        const password = req.body.password;
        const user_id = req.body.user_id;
        const secure_password = await securePassword(password);

        const updatedData = await User.findByIdAndUpdate({ _id: user_id }, { $set: { password: secure_password, token_pass: '' }});
        res.render('password_success');
    } catch (error) {
        console.log(error.message);
    }
};

const verificationLoad = async(req, res)=>{
    try {
        res.render('verification');
    } catch (error) {
        console.log(error.message);
    }
};

const sendVerificationLink = async(req, res)=>{
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email:email });
        console.log(req.body);
        if (userData) {
            sendVerifyMail(userData.name, userData.email, userData._id);
            res.render('verification', {message: "Письмо с верификацией отправлено"});

        } else {
            res.render('verification', {message: "Такая почта не существует в базе"});
        }
    } catch (error) {
        console.log(error.message);
    }
};

const editLoad = async(req, res)=>{
    try {
        const id = req.query.id;
        const userData = await User.findById({ _id:id });
        if (userData) {
            res.render('edit', { user: userData });
        } else {
            res.redirect('/home')
        }
    } catch (error) {
        console.log(error.message);
    }
};

const editLoadLecturer = async(req, res)=>{
    try {
        const id = req.query.id;
        const userData = await User.findById({ _id:id });
        if (userData) {
            res.render('edit_lecturer', { user: userData });
        } else {
            res.redirect('/home_lecturer')
        }
    } catch (error) {
        console.log(error.message);
    }
};

const updateProfile = async(req, res)=>{
    try {
        if (req.file) {
            const userData = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: {surname: req.body.surname, name: req.body.name, patronim: req.body.patronim, group_name: req.body.group_name, email: req.body.email, image: req.file.filename}});
        } else {
            const userData = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: {surname: req.body.surname, name: req.body.name, patronim: req.body.patronim, group_name: req.body.group_name, email: req.body.email}});
        }
        res.redirect('/home');
    } catch (error) {
        console.log(error.message);
    }
};

const updateProfileLecturer = async(req, res)=>{
    try {
        if (req.file) {
            const userData = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: {surname: req.body.surname, name: req.body.name, patronim: req.body.patronim, email: req.body.email, image: req.file.filename}});
        } else {
            const userData = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: {surname: req.body.surname, name: req.body.name, patronim: req.body.patronim, email: req.body.email}});
        }
        res.redirect('/home_lecturer');
    } catch (error) {
        console.log(error.message);
    }
};

const testsPageLoad = async(req, res)=>{
    try {
        const testsData = await Test.find();
        const userData = await User.findById({ _id: req.session.token_user });
        res.render('watch_test', {tests: testsData, user: userData});
    } catch (error) {
        console.log(error.message);
    }
};

const showTestPage = async(req, res) => {
    try {
        const id = req.query.id;
        const testData = await Test.findById({ _id: id });
        const replyData = await replyStud.findOne({ stud_id: req.session.token_user });
        var task_number = 0;
        if (testData) {
            if (replyData) {
                res.render('pass-test', { message: " ", test: testData, task_number: task_number, reply: replyData });
            } else {

                const reply = new replyStud;
                reply.stud_id = req.session.token_user;

                var temp_data = {
                    test_id: testData._id,
                    test_topic: testData.topic
                };
                reply.info_test.push(temp_data);

                for (let i = 0; i < testData.numberQues; i++) {
                    reply.temp_queries [i] = "";
                }
                const replyData = await reply.save();

                res.render('pass-test', { message: " ", test: testData, task_number: task_number, reply: replyData });
            }
        } else {
            res.redirect('/home');
        }
    } catch (error) {
        console.log(error.message);
    }
};

const studentAnswers = async(req, res) => {
    try {
        const id = req.query.id;
        const userData = await User.findById({ _id: req.session.token_user });
        const testData = await Test.findById({ _id: id });
        const replyData = await replyStud.findOne({ stud_id: req.session.token_user });

        if (req.body.button != 'close_test') {
            run_command = req.body[`stud_solution${req.body.button}`];
            var task_number = req.body.button;

            for (let i = 0; i < testData.numberQues; i++) {
                replyData.temp_queries[i] = req.body[`stud_solution${i+1}`];
            }
            
            const updatedReplyData = await replyData.save();

            async function run() {

                let connection;
              
                try {
                    connection = await oracledb.getConnection( {
                    user          : "C##DUTY",
                    password      : "ORCL",
                    connectString : "LOCALHOST/STDB1",
                    privilege: oracledb.SYSDBA
                });
                binds = {};
                options = {
                    outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
                    // extendedMetaData: true,               // get extra metadata
                    // fetchArraySize:   100                 // internal buffer allocation size for tuning
                };
                
                result = await connection.execute(run_command, binds, options);
                //console.log("Query results: ");
                //console.dir(result.rows, { depth: null });
                var text = "";

                for (let i = 0; i < result.rows.length; i++) {
                    let object = { "test": result.rows[i] };
                    
                    var temp = Object.keys(object.test).map(function(key) { 
                        return (" | " + key + ' - ' + object.test[key]) + " | " }).join("");
                
                    temp += "<br />";
                    temp = (i + 1) + temp;
                    text += temp;
                };

                res.render('pass-test', { message: text, test: testData, task_number: task_number, reply: replyData });
    
                } catch (err) {
                    console.error(err);
                    res.render('pass-test', { message: err, test: testData, task_number: task_number, reply: replyData });
                } finally {
                    if (connection) {
                        try {
                            await connection.close();
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            }
            run();

        } else {
            var task_number = 0;

            async function run() {

                let connection;
              
                try {
                    connection = await oracledb.getConnection( {
                        user          : "C##DUTY",
                        password      : "ORCL",
                        connectString : "LOCALHOST/STDB1",
                        privilege: oracledb.SYSDBA
                    });
                    binds = {};
                    options = {
                        outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
                        // extendedMetaData: true,               // get extra metadata
                        // fetchArraySize:   100                 // internal buffer allocation size for tuning
                    };
                    
                    for (let i = 0; i < testData.numberQues; i++) {
                        replyData.temp_queries[i] = "";
                        replyData.query_answers[i] = req.body[`stud_solution${i+1}`];

                        var temp_solution = fs.readFileSync(testData.problemSolution[i], 'utf8');
                        var command_check = req.body[`stud_solution${i+1}`] + '\nexcept\n' + temp_solution;

                        try {
                            result = await connection.execute(command_check, binds, options);
                            console.log("Query results: ");
                            console.dir(result.rows, { depth: null });

                            if (result.rows.length == 0) {
                                var temp_data = {
                                    correct_ans: 1,
                                    incorrect_ans: 0
                                };
                                replyData.quantity.push(temp_data);
                            } else {
                                var temp_data = {
                                    correct_ans: 0,
                                    incorrect_ans: 1
                                };
                                replyData.quantity.push(temp_data);
                            }
                        } catch (err) { 
                            console.error(err);
                            var temp_data = {
                                correct_ans: 0,
                                incorrect_ans: 1
                            };
                            replyData.quantity.push(temp_data);
                        }
                    }
                    console.log(req.body);
                    const updatedReplyData = await replyData.save();
                    console.log(updatedReplyData);

                } catch (err) {
                    console.error(err);
                } finally {
                    if (connection) {
                        try {
                            await connection.close();
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            }
            run();

            userData.about_test.push(testData._id);
            const updatedUserData = await userData.save();
            res.redirect('/watch_test');
        }
    } catch (error) {
        console.log(error.message);
    }
};

const createTest = async(req, res)=>{
    try {
        res.render('constructor');
    } catch (error) {
        console.log(error.message);
    };
};


const sendCreatedTest = async(req, res)=>{
    try {
        const test = new Test;
        test.numberQues = req.body.count_que;
        test.numberRemaining = req.body.test_remaining;
        test.topic = req.body.topic;
        const randomString = randomstring.generate();
        test.token_test = randomString;
        const testData = await test.save();
        for (let i = 0; i < req.body.count_que; i++) {
            test.problemStatement.push(req.body[`task${i+1}`]);
            test.problemPreview.push(req.body[`preview${i+1}`]);
            test.problemSolution.push(req.files.scriptSolution[i].path);

            var temp_data = {
                path: req.files.scriptTable[i].path,
                name: req.files.scriptTable[i].originalname,
                table_name: req.body[`table_name${i+1}`]
            };
            test.scriptTable.push(temp_data);
            
            var temp_data = {
                path: req.files.scriptTableData[i].path,
                name: req.files.scriptTableData[i].originalname
            };
            test.scriptTableData.push(temp_data);

            test.image.push(req.files.image[i].filename);
            const testData = await test.save();
        }
        console.log("Добавление нового теста в базу");
        console.log(testData);
        
        let uniq_scriptTable = [];
        let uniq_scriptTableData = [];
        for (let i = 0; i < testData.numberQues; i++) {
            uniq_scriptTable.push(testData.scriptTable[i].name);
            uniq_scriptTableData.push(testData.scriptTableData[i].name);
        }
        uniq_scriptTable = uniq_scriptTable.filter((x, i, a) => a.indexOf(x) == i);
        uniq_scriptTableData = uniq_scriptTableData.filter((x, i, a) => a.indexOf(x) == i);
        let temp;

        for (let j = 0; j < uniq_scriptTable.length; j++) {
            temp = uniq_scriptTable[j];
            for (let i = 0; i < testData.numberQues; i++) {
                if (temp == testData.scriptTable[i].name) {
                    uniq_scriptTable[j] = fs.readFileSync(testData.scriptTable[i].path, 'utf8');
                    break;
                }
            }

            temp = uniq_scriptTableData[j];
            for (let i = 0; i < testData.numberQues; i++) {
                if (temp == testData.scriptTableData[i].name) {
                    uniq_scriptTableData[j] = fs.readFileSync(testData.scriptTableData[i].path, 'utf8');
                    break;
                }
            }
        }

        async function run() {

            let connection;
          
            try {
                connection = await oracledb.getConnection( {
                user          : "C##DUTY",
                password      : "ORCL",
                connectString : "LOCALHOST/STDB1",
                privilege: oracledb.SYSDBA
            });
            binds = {};
            options = {
                autoCommit: true,
                // batchErrors: true,  // continue processing even if there are data errors
                bindDefs: [
                  { type: oracledb.NUMBER },
                  { type: oracledb.STRING, maxSize: 20 }
                ]
            };
            
            for (let i = 0; i < uniq_scriptTable.length; i++) {
                result = await connection.execute(uniq_scriptTable[i], binds, options);
                result = await connection.execute(uniq_scriptTableData[i], binds, options);
            }

            } catch (err) {
                console.error(err);
            } finally {
                if (connection) {
                    try {
                        await connection.close();
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }
        run();
        
        res.render('constructor', {message: "Keep waiting"});
    } catch (error) {
        console.log(error.message);
    }
};

const showAllTests = async(req, res)=>{
    try {
        const testsData = await Test.find({});
        res.render('test_status', {tests: testsData});
    } catch (error) {
        console.log(error.message);
    }
};

const editLecturerTest = async(req, res) => {
    try {
        const id = req.query.id;
        const testData = await Test.findById({ _id: id });
        if (testData) {
            res.render('edit-test', { test: testData, message: " " });
        } else {
            res.redirect('/home_lecturer');
        }
    } catch (error) {
        console.log(error.message);
    }
};

const updateTests = async(req, res) => {
    try {
        let x = false;
        const TestData = await Test.findById({ _id: req.body.id });
        
        if (typeof req.body.index_genTable == 'string') {
            if (JSON.stringify(req.body.index_genTable.match(/fakepath/gi)) == JSON.stringify(req.body.index_testData.match(/fakepath/gi))) {
                x = true;
                req.body.index_genTable = [req.body.index_genTable];
                req.body.index_testData = [req.body.index_testData];
                req.body.index_solution = [req.body.index_solution];
                req.body.index_photo = [req.body.index_photo];
            } else {
                x = false;
            }
        } else {
            for (let i = 0; i < TestData.numberQues; i++) {
            
                var i_genTable = req.body.index_genTable[i];
                var i_testData = req.body.index_testData[i];
                
                if (JSON.stringify(i_genTable.match(/fakepath/gi)) == JSON.stringify(i_testData.match(/fakepath/gi))) {
                    x = true;
                } else {
                    x = false;
                    break;
                }
            }
        }
        console.log(x);

        if (x == true) {
            TestData.numberRemaining = req.body.test_remaining;
            TestData.topic = req.body.topic;
            const updatedTestData = await TestData.save();
            let counter_solution = 0;
            let counter_photo = 0;
            let counter_genTable = 0;
            let counter_testData = 0;
            let table_forDelete = [];

            for (let i = 0; i < TestData.numberQues; i++) {
                TestData.problemStatement[i] = req.body[`task${i+1}`];
                TestData.problemPreview[i] = req.body[`preview${i+1}`];
                
                if (req.body.index_solution[i] != '') {
                    TestData.problemSolution[i] = req.files.scriptSolution[counter_solution].path;
                    counter_solution += 1;
                }
                
                if (req.body.index_photo[i] != '') {
                    TestData.image[i] = req.files.image[counter_photo].filename;
                    counter_photo += 1;
                }
                
                var old_table = `DROP TABLE ${TestData.scriptTable[i].table_name}`;
                table_forDelete.push(old_table);
                if (req.body.index_genTable[i] != '') {
                    var temp_data = {
                        path: req.files.scriptTable[counter_genTable].path,
                        name: req.files.scriptTable[counter_genTable].originalname,
                        table_name: req.body[`table_name${i+1}`]
                    };

                    TestData.scriptTable[i] = temp_data;
                    counter_genTable += 1;
                }
                
                if (req.body.index_testData[i] != '') {
                    var temp_data = {
                        path: req.files.scriptTableData[counter_testData].path,
                        name: req.files.scriptTableData[counter_testData].originalname
                    };
                    tab_data = fs.readFileSync(temp_data.path, 'utf8');

                    TestData.scriptTableData[i] = temp_data;
                    counter_testData += 1;
                }
                
                const updatedTestData = await TestData.save();
            }
            table_forDelete = table_forDelete.filter((x, i, a) => a.indexOf(x) == i);
            
            let uniq_scriptTable = [];
            let uniq_scriptTableData = [];
            for (let i = 0; i < TestData.numberQues; i++) {
                uniq_scriptTable.push(TestData.scriptTable[i].name);
                uniq_scriptTableData.push(TestData.scriptTableData[i].name);
            }
            uniq_scriptTable = uniq_scriptTable.filter((x, i, a) => a.indexOf(x) == i);
            uniq_scriptTableData = uniq_scriptTableData.filter((x, i, a) => a.indexOf(x) == i);
            let temp;

            for (let j = 0; j < uniq_scriptTable.length; j++) {
                temp = uniq_scriptTable[j];
                for (let i = 0; i < TestData.numberQues; i++) {
                    if (temp == TestData.scriptTable[i].name) {
                        uniq_scriptTable[j] = fs.readFileSync(TestData.scriptTable[i].path, 'utf8');
                        break;
                    }
                }

                temp = uniq_scriptTableData[j];
                for (let i = 0; i < TestData.numberQues; i++) {
                    if (temp == TestData.scriptTableData[i].name) {
                        uniq_scriptTableData[j] = fs.readFileSync(TestData.scriptTableData[i].path, 'utf8');
                        break;
                    }
                }
            }

            async function run() {

                let connection;
              
                try {
                    connection = await oracledb.getConnection( {
                    user          : "C##DUTY",
                    password      : "ORCL",
                    connectString : "LOCALHOST/STDB1",
                    privilege: oracledb.SYSDBA
                });
                binds = {};
                options = {
                    autoCommit: true,
                    // batchErrors: true,  // continue processing even if there are data errors
                    bindDefs: [
                      { type: oracledb.NUMBER },
                      { type: oracledb.STRING, maxSize: 20 }
                    ]
                };

                for (let i = 0; i < table_forDelete.length; i++) {
                    result = await connection.execute(table_forDelete[i], binds, options);
                }
    
                for (let i = 0; i < uniq_scriptTable.length; i++) {
                    result = await connection.execute(uniq_scriptTable[i], binds, options);
                    result = await connection.execute(uniq_scriptTableData[i], binds, options);
                }
    
                } catch (err) {
                    console.error(err);
                } finally {
                    if (connection) {
                        try {
                            await connection.close();
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            }
            run();

            res.render('edit-test', { test: TestData, message: "Данный тест обновлён" });
            console.log("Данный тест обновлён");
        } else {
            res.render('edit-test', { test: TestData, message: "Данный тест НЕ обновлён" });
            console.log("Данный тест НЕ обновлён");
        }
    } catch (error) {
        console.log(error.message);
    }
};


const deleteTests = async(req, res) => {
    try {
        const id = req.query.id;
        var table_forDelete = [];

        const TestData = await Test.findById({ _id: id });
        for (let i = 0; i < TestData.numberQues; i++) {
            var old_table = `DROP TABLE ${TestData.scriptTable[i].table_name}`;
            table_forDelete.push(old_table);
        }
        table_forDelete = table_forDelete.filter((x, i, a) => a.indexOf(x) == i);

        async function run() {

            let connection;
          
            try {
                connection = await oracledb.getConnection( {
                user          : "C##DUTY",
                password      : "ORCL",
                connectString : "LOCALHOST/STDB1",
                privilege: oracledb.SYSDBA
            });
            binds = {};
            options = {
                autoCommit: true,
                // batchErrors: true,  // continue processing even if there are data errors
                bindDefs: [
                  { type: oracledb.NUMBER },
                  { type: oracledb.STRING, maxSize: 20 }
                ]
            };

            for (let i = 0; i < table_forDelete.length; i++) {
                result = await connection.execute(table_forDelete[i], binds, options);
            }

            } catch (err) {
                console.error(err);
            } finally {
                if (connection) {
                    try {
                        await connection.close();
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }
        run();

        await Test.deleteOne({ _id: id });
        res.redirect('/test_status');
    } catch (error) {
        console.log(error.message);
    }

}


module.exports = {
    loadRegister,
    insertUser,
    verifyMail,
    loginLoad,
    briefLoad,
    verifyLogin,
    loadHome,
    loadHome_lecturer,
    userLogout,
    lecturerLogout,
    forgetLoad,
    forgetVerify,
    forgetPasswordLoad,
    resetPassword,
    verificationLoad,
    sendVerificationLink,
    editLoad,
    updateProfile,
    editLoadLecturer,
    updateProfileLecturer,
    testsPageLoad,
    showTestPage,
    createTest,
    sendCreatedTest,
    showAllTests,
    editLecturerTest,
    updateTests,
    deleteTests,
    studentAnswers,
    createClassicTest,
    createChange,
    renderResultsPage,
    getStudentsByTestTopic
};