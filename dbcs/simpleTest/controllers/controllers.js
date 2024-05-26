const userController = require('./userController')
const testController = require('./testController')
const testService = require('../use_case/service')

class Controllers{
    constructor(service){
        this.UserCont = new userController(service)
        this.TestCont = new testController(service)
    }
}

module.exports = new Controllers(testService)