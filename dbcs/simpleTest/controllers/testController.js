const Test = require('../entity/test')
const testService = require('../use_case/service')


class TestController {

    async getTests(req, res) {
        try {
            const tests = await testService.listTest();
            const testsWithId = tests.map(test => ({ ...test, testId: test._id }));
            res.render('../views/users/ClassicTests', { tests: testsWithId });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
    


    async getTestById(req, res) {
        try {
            const testId = req.params.id;
            const test = await testService.getTest(testId);
            if (test) {
                console.log("Test found:", test);
                res.render('../views/users/startClassicTest', { test }); // Передаем объект test для рендеринга
            } else {
                console.error('Test not found');
                res.status(404).send('Test not found');
            }
        } catch (error) {
            console.error('Error fetching test:', error);
            res.status(500).send('Internal server error');
        }
    }
    


    async renderCreateTest(req, res) {
        try {
            res.render('../views/tests/ChangeTest');
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

    async createClassicTest(req, res) {
        try {
            console.log('Received request body:', req.body);

            const { _id,lectorId, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test, questions} = req.body;
            const newTest = new Test(_id,lectorId, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test, questions);
            console.log('answeroptions:/n',newTest.answerOptions)
            await testService.addTest(newTest);
            res.render('../views/tests/ChangeTest');
        }
        catch (e) {
            console.log(e);
            res.status(500).send('Внутренняя ошибка сервера');

        }
    }

    async updateTest(req, res) {
        try {
            const { _id,lectorId , numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test, answerOptions } = req.body;
            const updatedTest = new Test(_id,lectorId, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable, scriptTableData, image, token_test, answerOptions);
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
