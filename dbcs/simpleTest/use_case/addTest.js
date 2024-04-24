const testClass = require('../entity/test')

module.exports = function makeAddTest(db){
    return async function addTest(testInfo){
        const test = testClass(testInfo)
        return db.createTest(test)
    } 
}