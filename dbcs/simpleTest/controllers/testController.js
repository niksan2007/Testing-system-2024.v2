const Test = require('../entity/test')
const testService = require('../use_case/service')


class TestController {

    async getTests(req, res) {
        try {
            const tests = await testService.listTest();
            return tests;
        } catch (e) {
            throw e;
        }
    }

    async getTestById(req, res) {
        try {
            const test = await testService.getTest(req.params.id);
            if (test) {
                return test;
            } else {
                const error = new Error('Test not found');
                error.status = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }


    async renderCreateTest(req, res) {
        try {
            res.render('../views/tests/ChangeTest');
            //res.render("../views/tests/ClassicConstructor.ejs")
            // const { _id, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test } = req.body;
            // const newTest = new Test(_id, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test);
            // const createdTest = await testService.addTest(newTest);
            // return createdTest;
        } catch (error) {
            throw error;
        }
    }

    async renderClassicConstructor(req, res) {
        try {
            res.render('../views/tests/ClassicConstructor');
            
        } catch (error) {
            res.status(500).send('Внутренняя ошибка сервера');
        }
    }

    async createClassicTest(req, res){
        try{
            //console.log(req.body)
            const { _id, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test, answerOptions } = req.body;
            const newTest = new Test(_id, 2, 3, topic, problemStatement, problemPreview, problemSolution, scriptTable,scriptTableData,image , token_test, []);
            await testService.addTest(newTest);
            res.render('../views/tests/ChangeTest');
        }
        catch(e){
            console.log(e);
            res.status(500).send('Внутренняя ошибка сервера');

        }
    }

    async updateTest(req, res) {
        try {
            const { _id, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test } = req.body;
            const updatedTest = new Test(_id, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test);
            const result = await testService.editTest(req.params.id, updatedTest);
            if (result) {
                return result;
            } else {
                res.status(404).send('Test not found');
            }
        } catch (error) {
            console.log(e);
            res.status(500).send('Внутренняя ошибка сервера');
        }
    }

    async deleteTest(req, res) {
        try {
            const deletedTest = await testService.removeTest(req.params.id);
            if (deletedTest) {
                return deletedTest;
            } else {
                const error = new Error('Test not found');
                error.status = 404;
                throw error;
            }
        } catch (error) {
            console.log(e);
            res.status(500).send('Внутренняя ошибка сервера');
        }
    }
}
module.exports = TestController