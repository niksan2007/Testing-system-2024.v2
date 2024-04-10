const testModel = require("../../models/testModel");


//TODO:: Переписать запросы для работы с id пользователя и creatorId(кто создал)
class ResultRepository{
    async getTestById(id){

        if(!id){
            throw new Error('Не указан ID');
        }
        //const test = await testModel.findById(id);
        return test;
    }
}

module.exports = new ResultRepository();