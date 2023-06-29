/*
Исходники на Github
https://github.com/ComradeWayne/Testing-system-2023
*/

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://spacecake:DcdR689@cluster0.vfaglkh.mongodb.net/control_system?retryWrites=true&w=majority");

const express = require("express");
const app = express();

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);

app.listen(3000, function(){
    console.log("Server is running");
});