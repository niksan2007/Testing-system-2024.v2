

module.exports = function makeAddTest(db){
    return async function addTest(test){
        try{
            if(!test){
                throw e;
            }
            return db.createTest(test)
        }
        catch (e){
            throw e;
        }
        
    } 
}