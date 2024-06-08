const UserTest = require("../entity/userTest")
const testService = require('../use_case/service')
const repStud = require('../../models/replyStudModel')

class ResultController{


    async getResults(req, res) {
        try {
            const lecturerId = req.session.token_lecturer;
            if (!lecturerId) {
                return res.status(403).send('Доступ запрещен');
            }
            const replies = await testService.listResult(lecturerId);
            const uniqueTestTopics = Array.from(new Set(replies.map(reply => reply.info_test[0]?.test_topic)))
                .filter(topic => topic !== null);
            console.log(__dirname)
            res.render("../views/users/Results.ejs", { testTopics: uniqueTestTopics });
        } catch (error) {
            console.error('Ошибка при рендеринге страницы результатов:', error);
            res.status(500).send('Внутренняя ошибка сервера');
        }
    }


    async getResultBy(req, res) {
        try {
            const { testTopic, id } = req.params;
            
            if (testTopic) {
                // Если передан параметр testTopic, вызовем метод для получения результатов по теме теста
                const students = await testService.getResultByTopic(testTopic);
                return res.render('../views/users/studentsByTestTopic', { students: students, testTopic: testTopic });
            } else if (id) {
                // Если передан параметр id, вызовем метод для получения результатов по ID пользователя
                const userId = req.session.token_user;
                if (!userId) {
                    return res.status(403).send('Доступ запрещен');
                }
                const result = await testService.getResult(userId);
                if (result) {
                    return res.json(result);
                } else {
                    const error = new Error('Result not found');
                    error.status = 404;
                    throw error;
                }
            } else {
                // Если ни один из параметров не передан, вернем ошибку
                return res.status(400).json({ error: 'Bad Request: Missing required parameters' });
            }
        } catch (e) {
            console.error('Ошибка при получении данных:', e);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    

    async createResult(req, res){
        try {
            const newUserTest = req.body;
            const result = await testService.addResult(newUserTest);
            return result;
        } catch (e) {
            throw e;
        }
    }
}

module.exports =  ResultController