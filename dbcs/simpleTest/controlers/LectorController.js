const LectorRepository = require("../dal/LectorRepository");
const testService = require("../dal/LectorRepository");



class LectorController{
    async createTest(req, res){
        try{
            const test = await LectorRepository.createTest(req.body);
            res.json(test);
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async updateTest(req,res){
        try{
            const updatedTest = await LectorRepository.updateTest(req.body);
            return res.json(updatedTest);
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async deleteTest(req,res){
        try{
            
            const test = await LectorRepository.deleteTest(req.params.id);
            return res.json(test);
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async getTests(req,res){
        try{
            const tests = await LectorRepository.getTests();
            return res.json(tests);
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async getTestById(req,res){
        try{           
            const test = await LectorRepository.getTestById(req.params.id);
            return res.json(test);

        }
        catch(e){
            res.status(500).json(e);
        }
    }
}

module.exports = new LectorController();