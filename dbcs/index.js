/*
Исходники на Github
https://github.com/ComradeWayne/Testing-system-2023
*/

const mongoose = require("mongoose");
//Smongoose.connect("mongodb+srv://niksan:123123123@timoshenkocluster.jujyl.mongodb.net/?retryWrites=true&w=majority&appName=TimoshenkoCluster");
mongoose.connect("mongodb+srv://niksan:123123123@timoshenkocluster.jujyl.mongodb.net/control_system?retryWrites=true&w=majority");

const express = require("express");
const app = express();


app.set('view engine', 'ejs');

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);

const resultRoute = require('./simpleTest/transport/resultRoute');
app.use('/results',resultRoute);

const { lectorRoute, studentRoute } = require('./simpleTest/transport/userRoute')
app.use('/lector',lectorRoute);
app.use('/student',studentRoute);

app.listen(3000, function(){
    console.log("Server is running");
});