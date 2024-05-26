const testController = require('./testController')
const resultController = require('./resultController')


class Controllers{
    constructor(){
        this.ResultController = new resultController()
        this.TestContoller = new testController()
    }
}

module.exports = new Controllers()