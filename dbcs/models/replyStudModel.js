const mongoose = require("mongoose");

// Определение схемы
const replyStudSchema = new mongoose.Schema({
    stud_id: mongoose.ObjectId,
    lector_id: mongoose.ObjectId, // Добавляем поле lector_id
    info_test: [{
        test_id: mongoose.ObjectId,
        test_topic: String
    }],
    query_answers: [String],
    quantity: [{
        correct_ans: Number,
        incorrect_ans: Number
    }],
    temp_queries: [String]
});

const ReplyStud = mongoose.model('ReplyStud', replyStudSchema);



    
module.exports = mongoose.model('ReplyStud', replyStudSchema);