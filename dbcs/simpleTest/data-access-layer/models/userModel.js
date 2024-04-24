const mongoose = require("mongoose");


//TODO:: Добавить поле createdTest для хранения созданных тестов
const userSchema = new mongoose.Schema({

    surname: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    patronim: {
        type: String,
        default: null
    },
    group_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default: 0
    },
    is_admin: {
        type: Number,
        require: true
    },
    is_lecturer: {
        type: Number,
        require: true
    },
    is_verified: {
        type: Number,
        default: 0
    },
    token_pass: {
        type: String,
        default: ''
    },
    about_test: {
        type: [String],
        default: null
    }

});

module.exports = mongoose.model('User', userSchema);
