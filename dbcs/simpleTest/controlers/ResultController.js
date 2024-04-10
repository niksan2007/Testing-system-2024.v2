const userModel = require("../../models/userModel");
const ResultRepository = require('../dal/ResultRepository');


//TODO:: Добавить проверку на Преподавателя и методы обработки
class ResultController{
    async getResults(req,res){
        const user = userModel.findById(req.params.userId)
        if(user.is_lecturer){
            ResultRepository.getTestById()
        }
    }
}

module.exports = new ResultController();