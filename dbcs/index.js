/*
Исходники на Github
https://github.com/ComradeWayne/Testing-system-2023
*/
//import resultRoute from "./simpleTest/routes/resultRoute";

const mongoose = require("mongoose");
//Smongoose.connect("mongodb+srv://niksan:123123123@timoshenkocluster.jujyl.mongodb.net/?retryWrites=true&w=majority&appName=TimoshenkoCluster");
mongoose.connect("mongodb+srv://niksan:123123123@timoshenkocluster.jujyl.mongodb.net/control_system?retryWrites=true&w=majority");

const express = require("express");
const app = express();

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);

const resultRoute = require('./simpleTest/routes/resultRoute');
app.use('/results',resultRoute);

const lectorRoute = require('./simpleTest/routes/lectorRoute');
app.use('/lector',lectorRoute);

const studentRoute = require('./simpleTest/routes/studentRoute');
app.use('/student',studentRoute);

app.listen(3000, function(){
    console.log("Server is running");
});