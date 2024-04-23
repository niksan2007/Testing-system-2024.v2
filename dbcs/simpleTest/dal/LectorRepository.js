const testModel = require('../../models/testModel')




class LectorRepository{

    async createTest(test){
            const createdTest = await testModel.create(test);
            return createdTest
    }

    async updateTest(test){
        if(!test.id){
            throw new Error('Теста с таким ID не существует');
        }
        const updatedTest = await testModel.findByIdAndUpdate(test._id, test,{new:true});
        return updatedTest;
    }

    async deleteTest(id){
        
           
        if(!id){
            throw new Error('Не указан ID');
        }
            const test = await testModel.findByIdAndDelete(id);
            return test;

    }

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
}

module.exports = new LectorRepository();