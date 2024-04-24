const userModel = require('./models/userModel')

class UserRepository{

    async getUserById(id){

        if(!id){
            throw new Error('Не указан ID');
        }
        const test = await userModel.findById(id);
        return test;
    } 
}

module.exports = UserRepository()