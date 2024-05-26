const testClass = require('../entity/test')

module.exports = function makeGetTest(db){
    return async function getTest(testInfo){
        const test = testClass(testInfo)
        try{
            return db.getTestById(test._id)
            
        } catch (e){
            throw e
        }
        
    } 
}