const userCont = require('./userController')
const testCont = require('./testController')

class Controllers{
    constructor(user, test){
        UserController = user
        TestController = test
    }
}

module.exports = new Controllers(userCont, testCont)