const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({

    lector_id: mongoose.ObjectId,
    
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
            questionType: { type: String, enum: ['singleChoice', 'multipleChoice', 'openEnded'] },
            question:{type:String},
            answer:{type:[String]},
            correctanswer:{type:[String]}
        }
        ],
        default: null
    }

});

module.exports = mongoose.model('Test', testSchema);