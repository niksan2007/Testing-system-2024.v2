const mongoose = require("mongoose");

const replyStudSchema = new mongoose.Schema({

    stud_id: mongoose.ObjectId,
    info_test: {
        type: [{
            test_id: { type: mongoose.ObjectId },
            test_topic: { type: String }
        }],
        default: null
    },
    query_answers: {
        type: [String],
        //required: true
        default: null
    },
    quantity: {
        type: [{
            correct_ans: { type: Number },
            incorrect_ans: { type: Number }
        }],
        default: null
    },
    temp_queries: {
        type: [String],
        //required: true
        default: null
    }

});

module.exports = mongoose.model('ReplyStud', replyStudSchema);
