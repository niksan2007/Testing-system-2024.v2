const testRepo = require('./testRepository')
const resultRepo = require('./resultRepository')

class Repository{
    
    constructor(test, result){
        this.TestRepository = test;
        this.ResultRepository = result;
    }
}

module.exports = new Repository(testRepo, resultRepo)