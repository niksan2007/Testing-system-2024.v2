
class UserController{

    constructor(testService){
        this.service = testService
    }

    async getTests(httpReq){
        try{
            tests = await this.service.listTest();
            return tests;
        }catch(e){
            throw e;
        }
    }

    async getTestById(httpReq){
        try {
            const test = await this.service.getTest(httpReq.params.id);
            if (test) {
                res.json(test);
            } else {
                const error = new Error('Test not found');
                error.status = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async saveTest(httpReq){
        try {
            const savedTest = await this.service.addResult(httpReq.body);
            return savedTest;
        } catch (error) {
            throw error;
        }
    }

    async createTest(httpReq) {
        try {
            const createdTest = await this.service.addTest(httpReq.body);
            return createdTest;
        } catch (error) {
            throw error;
        }
    }

    async updateTest(httpReq) {
        try {
            const updatedTest = await this.service.editTest(httpReq.params.id, req.body);
            if (updatedTest) {
                return updatedTest;
            } else {
                const error = new Error('Test not found');
                error.status = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteTest(httpReq) {
        try {
            const deletedTest = await this.service.removeTest(httpReq.params.id);
            if (deletedTest) {
                return deletedTest;
            } else {
                const error = new Error('Test not found');
                error.status = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserController