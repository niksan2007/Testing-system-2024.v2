const checkResult = require("./checkResult");


module.exports = function makeAddResult(db){
    return async function addResult(result, id){
        try{
            const { testId, lectorId, answers } = result;
            const test = await db.TestRepository.getTestById(testId);
            if (!test) {
                throw new Error('Test not found');
            }
            const checkedRes = checkResult(test, testId, lectorId, answers, id);
            return db.ResultRepository.addResult(checkedRes);
        }
        catch (e){
            throw e;
        }
        
    } 
}