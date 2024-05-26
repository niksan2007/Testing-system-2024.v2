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


    async getResultById(req, res) {
        try {
            const id = req.session.token_user;
            if(!id){
                return res.status(403).send('Доступ запрещен');
            }
            const result = await testService.getResult(id);
            if (result) {
                return result;
            } else {
                const error = new Error('Result not found');
                error.status = 404;
                throw error;
            }
        } catch (e) {
            throw e;
        }
    }
    
    async getResultsByTestTopic(req, res){
        try{
            const { testTopic } = req.params;
            const students = await testService.getResultByTopic(testTopic)
            res.render('../views/users/studentsByTestTopic', { students: students, testTopic: testTopic });
        }
        catch (e){
            console.error('Ошибка при получении данных об учениках:', e);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
        
    }
    

    async createResult(req, res){
        try {
            const { stud_id, info_test, query_answers, quantity, temp_queries } = req.body;
            const newUserTest = new UserTest(stud_id, info_test, query_answers, quantity, temp_queries);
            const result = await testService.createResult(newUserTest);
            return result;
        } catch (e) {
            throw e;
        }
    }
}

module.exports =  ResultController