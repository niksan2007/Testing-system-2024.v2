//TODO::Прописать контроллер

class TestController{

    constructor(testService){
        this.service = testService
    }

    async getResults(httpReq) {
        try {
            const results = await this.service.listResult();
            return results;
        } catch (e) {
            throw e;
        }
    }

    async getResultById(httpReq) {
        try {
            const result = await this.service.getResult(httpReq.params.id);
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
}

module.exports = TestController