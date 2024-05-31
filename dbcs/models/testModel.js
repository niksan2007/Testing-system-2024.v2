const mongoose = require("mongoose");
//TODO:: В дипломе просто прописать какие коллекции используем, а не диаграммой
const testSchema = new mongoose.Schema({

    numberQues:{
        type:Number,
        //require:true
        default: null
    },
    numberRemaining:{
        type:Number,
        //require:true
        default: null
    },
    topic:{
        type:String,
        //require:true
        default: null
    },
    problemStatement:{
        type:[String],
        //required: true
        default: null
    },
    problemPreview:{
        type:[String],
        default: null
    },
    problemSolution:{
        type:[String],
        //required: true
        default: null
    },
    scriptTable:{
        /*type:[String],
        required: true
        default: null*/
        type: [{
            path: {type: String},
            name: {type: String},
            table_name: {type: String}
        }],
        default: null
    },
    scriptTableData:{
        type: [{
            path: {type: String},
            name: {type: String}
        }],
        default: null
    },
    image:{
        type:[String],
        //required: true
        default: null
    },
    token_test:{
        type:String,
        //require:true
        default: null
    },
    answerOptions:{
        type: [{
            questionType: {
                type: String,
                enum: ['single', 'multiple', 'open'],
                required: true
            },
            options: {
                type: [String],
                required: function() { return this.questionType !== 'open'; }  // Обязательно для вопросов с вариантами
            },
            correctAnswers: {
                type: [String],
                required: function() { return this.questionType !== 'open'; }  // Обязательно для вопросов с вариантами
            },
            openAnswer: {
                type: String,
                required: function() { return this.questionType === 'open'; }  // Обязательно для развернутых ответов
            }
        }],
        default: null
    }

});

module.exports = mongoose.model('Test', testSchema);