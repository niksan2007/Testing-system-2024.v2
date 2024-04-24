const testClass = require('../entity/test')

module.exports = function makeRemoveTest(db){
    return async function removeTest(testInfo){
        const test = testClass(testInfo)
        try{
            return db.deleteTest(test._id)
            
        } catch (e){
            throw e
        }
        
    } 
}