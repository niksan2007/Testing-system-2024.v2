/*
Исходники на Github
https://github.com/ComradeWayne/Testing-system-2023
*/


const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const config = require('../config/config');
const nodemailer = require('nodemailer');
const excelJS = require('exceljs');

const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error.message);
    }
};

const sendNotification = async(name, email, password)=> {
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
            subject: 'Оповещение об учётной записи',
            html: '<p> Здравствуй, ' + name + '. Данные для авторизации.</p> <br><b>Почта: </b>' + email + '<br><b>Пароль: </b>' + password
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
            html: '<p> Здравствуй, ' + name + '. Ссылка для <a href="http://127.0.0.1:3000/admin/forget-password?token_pass=' + token_pass + '"> восстановления</a> вашего пароля. </p>'
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

const loadLogin = async(req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
};

const verifyLogin = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({email:email});
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                if (userData.is_admin === 0) {
                    res.render('login', {message: "Недостаточно прав"});
                } else {
                    req.session.token_admin = userData._id;
                    console.log(`Администратор ${userData.surname} ${userData.name} начал сессию в сервисе`);
                    console.log(`Его токен req.session.token_admin = ${req.session.token_admin}`);
                    res.redirect("/admin/home");
                }

            } else {
                res.render('login', {message: "Некорректная почта или пароль"});
            }
        } else {
            res.render('login', {message: "Такой учётной записи не существует в базе"});
        }
    } catch (error) {
        console.log(error.message);
    }

};

const loadDashboard = async(req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.token_admin });
        res.render('home', {admin: userData});
    } catch (error) {
        console.log(error.message);
    }
};

const logout = async(req, res) => {
    try {
        console.log(`Администратор с токеном req.session.token_admin = ${req.session.token_admin} закончил сессию в сервисе`);
        req.session.destroy();
        res.redirect('/admin');

    } catch (error) {
        console.log(error.message);
    }

};

const forgetLoad = async(req, res) => {
    try {
        res.render('forget');
    } catch (error) {
        console.log(error.message);
    }

};

const forgetVerify = async(req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({email:email});
        if (userData) {
            if (userData.is_admin === 0) {
                res.render('forget', {message: 'Данная почта некорректна'});
            } else {
                const randomString = randomstring.generate();
                const updatedData = awaitUser.updateOne({email:email}, {$set:{token_pass:randomString}});
                sendResetPasswordMail(userData.name, userData.email, randomString);
                res.render('forget', {message: 'Письмо отправлено'});
            }
        } else {
            res.render('forget', {message: 'Данная почта некорректна'});
        }

    } catch (error) {
        console.log(error.message);
    }
};

const forgetPasswordLoad = async(req, res) => {
    try {
        const token_pass = req.query.token_pass;
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

const resetPassword = async(req, res) => {
    try {
        const password = req.body.password;
        const user_id = req.body.user_id;
        const sPassword = await securePassword(password);
        const updatedData = await User.findByIdAndUpdate({_id:user_id}, {$set:{password:sPassword, token_pass:''}});
        res.render('password_success');
    } catch (error) {
        console.log(error.message);
    }

};

const adminDashboard = async(req, res) => {
    try {
        const usersData = await User.find({is_admin: 0});
        res.render('dashboard', {users: usersData});
    } catch (error) {
        console.log(error.message);
    }

};

const newLecturerLoad = async(req, res) => {
    try {
        res.render('new-lecturer');
    } catch (error) {
        console.log(error.message);
    }

};

const addLecturer = async(req, res) => {
    try {
        if (req.file == undefined) {
            var data_image = null;
        } else {
            var data_image = req.file.filename;
        }
        const surname = req.body.surname;
        const name = req.body.name;
        const patronim = req.body.patronim;
        const email = req.body.email;
        const password = randomstring.generate(8);
        const spassword = await securePassword(password);

        const user = new User({
            surname: surname,
            name: name,
            patronim: patronim,
            group_name: null,
            email: email,
            password: spassword,
            image: data_image,
            is_admin: 0,
            is_lecturer: 1,
            is_verified: 1
        });

        const userData = await user.save();
        if (userData) {
            sendNotification(name, email, password);
            res.render('new-lecturer', {message: "Запись успешно занесена в базу"});
        } else {
            res.render('new-lecturer', {message: "Что-то пошло не так!"});
        }
        
    } catch (error) {
        console.log(error.message);
    }

};

const editLecturerLoad = async(req, res) => {
    try {
        const id = req.query.id;
        const userData = await User.findById({ _id: id });
        if (userData) {
            res.render('edit-user', { user: userData, message: " " });
        } else {
            res.redirect('/admin/dashboard');
        }
    } catch (error) {
        console.log(error.message);
    }

};

const updateUsers = async(req, res) => {
    try {
        const userData = await User.findByIdAndUpdate({ _id: req.body.id }, { $set: { surname: req.body.surname, name: req.body.name, patronim: req.body.patronim, group_name: req.body.group_name } });
        res.render('edit-user', { user: userData, message: "Success" });
    } catch (error) {
        console.log(error.message);
    }

};

const deleteUsers = async(req, res) => {
    try {
        const id = req.query.id;
        await User.deleteOne({ _id: id });
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error.message);
    }
};

const exportUsers = async(req, res) => {
    try {
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("My Users");
        worksheet.columns = [
            {header: "Номер", key: "s_no"},
            {header: "Фамилия", key: "surname"},
            {header: "Имя", key: "name"},
            {header: "Отчество", key: "patronim"},
            {header: "Группа", key: "group_name"},
            {header: "Почта", key: "email"},
            {header: "Администратор", key: "is_admin"},
            {header: "Преподаватель", key: "is_lecturer"},
            {header: "Подтверждён", key: "is_verified"}
        ];
        let counter = 1;
        const userData = await User.find({ is_admin: 0});
        userData.forEach((user) => {
            user.s_no = counter;
            worksheet.addRow(user);
            counter++;
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
        );

        res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);

        return workbook.xlsx.write(res).then(() => {
            res.status(200);
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    forgetLoad,
    forgetVerify,
    forgetPasswordLoad,
    resetPassword,
    adminDashboard,
    newLecturerLoad,
    addLecturer,
    editLecturerLoad,
    updateUsers,
    deleteUsers,
    exportUsers
};