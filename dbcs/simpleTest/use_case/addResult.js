const checkResult = require("./checkResult");


//TODO::Прописать логику создания результата проверки
module.exports = function makeAddResult(db){
    return async function addResult(result){
        try{
            const checkedRes = checkResult(result);

            return db.addResult(checkedRes);
        }
        catch (e){
            throw e;
        }
        
    } 
}