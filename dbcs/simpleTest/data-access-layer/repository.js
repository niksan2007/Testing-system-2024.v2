const testRepository = require('./testRepository')
const userRepository = requirt('./userRepository')

class Repository{
    
    constructor(test, user){
        TestRepo = test
        UserRepo = user
    }
}

module.exports = new Repository(testRepository, userRepository)