const testModel = require("../../models/testModel");

class StudentRepository{
    async getTests(){
        const test = await testModel.find();
        return test;
    }

    async getTestById(id){

        if(!id){
            throw new Error('Не указан ID');
        }
        const test = await testModel.findById(id);
        return test;
    }
    
    async endTest(test){

        return(test);

    }
}

module.exports = new StudentRepository();