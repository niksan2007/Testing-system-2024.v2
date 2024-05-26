

module.exports = function makeAddTest(db){
    return async function addTest(test){
        try{
            return db.createTest(test)
        }
        catch (e){
            throw e;
        }
        
    } 
}