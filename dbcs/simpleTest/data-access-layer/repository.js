const testRepository = require('./testRepository')
const userRepository = require('./userRepository')

class Repository{
    
    constructor(test, user){
        this.TestRepo = test
        this.UserRepo = user
    }
}

module.exports = new Repository(testRepository, userRepository)