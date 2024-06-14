const userTest = require('../entity/userTest');
const mongoose = require("mongoose");

module.exports =  function CheckResult(test, testId, lectorId, answers, id){
        try {
            let correctAnswers = 0;
            let incorrectAnswers = 0;
            let queryAnswers = [];
        
            // Проверяем ответы студента
            try{
                test.answerOptions.forEach((question, index) => {
                    const studentAnswer = answers[index];
                    const correctAnswer = question.correctanswer;
    
                    if (JSON.stringify(studentAnswer).toLowerCase() === JSON.stringify(correctAnswer).toLowerCase()) {
                        correctAnswers++;
                    } else {
                        incorrectAnswers++;
                    }
                
                    queryAnswers.push(studentAnswer);
                });
            }
            catch {
                test.answerOptions.forEach((question, index) => {
                    const studentAnswer = answers[index];
                    const correctAnswer = question.correctanswer;
    
                    if (JSON.stringify(studentAnswer) === JSON.stringify(correctAnswer)) {
                        correctAnswers++;
                    } else {
                        incorrectAnswers++;
                    }
                
                    queryAnswers.push(studentAnswer);
                });
            }
            
            let flatList = [];
            queryAnswers.forEach(sublist => {
                sublist.forEach(item => {
                    flatList.push(item);
                });
            });
            res = new userTest(
                id,
                new mongoose.Types.ObjectId(lectorId),
                [{
                    test_id: new mongoose.Types.ObjectId(testId),
                    test_topic: test.topic
                }],
                flatList,
                [{
                    correct_ans: correctAnswers,
                    incorrect_ans: incorrectAnswers
                }],
                []
            );
            
            return res
            
        } catch (e) {
            console.error('Ошибка при проверке результата:', e);
            throw e;
        }
    }
