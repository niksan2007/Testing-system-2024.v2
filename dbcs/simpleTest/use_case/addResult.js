const checkResult = require("./checkResult").default;


module.exports = function makeAddResult(db){
    return async function addResult(result, id){
        try{
            const checkedRes = checkResult(result, id);

            return db.addResult(checkedRes);
        }
        catch (e){
            throw e;
        }
        
    } 
}