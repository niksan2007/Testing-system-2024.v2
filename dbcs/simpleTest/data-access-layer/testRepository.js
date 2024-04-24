const repStud = require('./models/replyStudModel')
const test = require('./models/testModel')


class TestRepository{
    async createTest(test){
        const createdTest = await test.create(test);
        return createdTest
    }

    async updateTest(test){
        if(!test.id){
            throw new Error('Теста с таким ID не существует');
        }
        const updatedTest = await test.findByIdAndUpdate(test._id, test,{new:true});
        return updatedTest;
    }

    async deleteTest(id){


        if(!id){
            throw new Error('Не указан ID');
        }
            const test = await test.findByIdAndDelete(id);
            return test;

    }

    async getTests(){

        const test = await test.find();
        return test;
    }

    async getTestById(id){

        if(!id){
            throw new Error('Не указан ID');
        }
        const test = await test.findById(id);
        return test;
    }
    
    async getAllResults(){
        
        const res = await repStud.find()
        return res
    }

    async getUserResult(user_id){
        if(!user_id){
            throw new Error('Не указан ID');
        }
        return await repStud.find({stud_id:user_id})
    }
}

module.exports = new TestRepository()