
//TODO::Прописать логику проверки тестов
module.exports = function makeCheckResult(db){
    return async function CheckResult(result){
    try {
        // Получаем тест по его ID
        const test = await db.getTestById(result.info_test[0].test_id);
        
        if (!test) {
            throw new Error('Test not found');
        }

        // Инициализируем счетчики правильных и неправильных ответов
        let correct_ans = 0;
        let incorrect_ans = 0;

        // Проверяем ответы пользователя
        result.query_answers.forEach((answer, index) => {
            const question = test.answerOptions[index];
            if (question.questionType === 'open') {
                if (answer === question.openAnswer) {
                    correct_ans++;
                } else {
                    incorrect_ans++;
                }
            } else {
                const correctAnswers = question.correctAnswers;
                if (Array.isArray(answer) && answer.every(ans => correctAnswers.includes(ans)) && answer.length === correctAnswers.length) {
                    correct_ans++;
                } else {
                    incorrect_ans++;
                }
            }
        });

        // Записываем количество правильных и неправильных ответов
        result.quantity = [{ correct_ans, incorrect_ans }];

        return result;
    } catch (e) {
        console.error('Ошибка при проверке результата:', e);
        throw e;
    }
}
}