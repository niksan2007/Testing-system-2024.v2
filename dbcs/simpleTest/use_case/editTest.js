const testClass = require('../entity/test')

module.exports = function makeEditTest(db){
    return async function editTest(testInfo){
        const test = testClass(testInfo)
        try{
            return db.updateTest(test)
            
        } catch (e){
            throw e
        }
    } 
}