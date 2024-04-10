const StudentRepository = require('../dal/StudentRepository')



class StudentController{
    async getTests(req,res){
        try{
            const tests = await StudentRepository.getTests();
            return res.json(tests);
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async getTestById(req,res){
        try{           
            const test = await StudentRepository.getTestById(req.params.id);
            return res.json(test);

        }
        catch(e){
            res.status(500).json(e);
        }
    }

    //TODO:: Добавить логику проверки тестов и сохранения результатов
    async endTest(req,res){
        try{
            const test = await StudentRepository.endTest(req.body);
        }
        catch (e){
            res.status(500).json(e);
        }
    }
}

module.exports = new StudentController();