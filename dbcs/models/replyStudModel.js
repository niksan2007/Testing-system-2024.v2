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

// Пример данных
const newData = {
    stud_id: new mongoose.Types.ObjectId(), // Создаем новый ObjectId для студента
    lector_id: new mongoose.Types.ObjectId('65d22a6b596c7e1a179c523f'), // Создаем новый ObjectId для лектора
    info_test: [{
        test_id: new mongoose.Types.ObjectId(), // Создаем новый ObjectId для теста
        test_topic: "SQL"
    }],
    query_answers: ["answer1", "answer2", "answer3"],
    quantity: [{
        correct_ans: 2,
        incorrect_ans: 1
    }],
    temp_queries: ["temp1", "temp2"]
};


// Вставка данных в базу данных
ReplyStud.create(newData)
    .then(createdData => {
        console.log('Inserted data:', createdData);
    })
    .catch(error => {
        console.error('Error inserting data:', error);
    });


    
module.exports = mongoose.model('ReplyStud', replyStudSchema);