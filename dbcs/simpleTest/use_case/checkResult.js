import userTest from '../entity/userTest';

export default function makeCheckResult(db){
    return async function CheckResult(result){
        try {
            const { testId, studentId, lectorId, answers } = result;

            // Получаем тест из базы данных по testId
            const test = await db.getTestById(testId);

            if (!test) {
                throw new Error('Test not found');
            }
        
            let correctAnswers = 0;
            let incorrectAnswers = 0;
            let queryAnswers = [];
        
            // Проверяем ответы студента
            test.answerOptions.forEach((question, index) => {
                const studentAnswer = answers[index];
                const correctAnswer = question.correctAnswer;
            
                if (JSON.stringify(studentAnswer).toLowerCase() === JSON.stringify(correctAnswer).toLowerCase()) {
                    correctAnswers++;
                } else {
                    incorrectAnswers++;
                }
            
                queryAnswers.push(studentAnswer);
            });
            
            result = new userTest({
                stud_id: studentId,
                lector_id: lectorId,
                info_test: [{
                    test_id: testId,
                    test_topic: test.topic
                }],
                query_answers: queryAnswers,
                quantity: [{
                    correct_ans: correctAnswers,
                    incorrect_ans: incorrectAnswers
                }],
                temp_queries: []
            });
            
        } catch (e) {
            console.error('Ошибка при проверке результата:', e);
            throw e;
        }
    }
}