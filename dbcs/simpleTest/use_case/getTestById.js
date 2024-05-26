module.exports = function makeGetTest(db){
    return async function getTest(test){
        try{
            return db.getTestById(test._id)
        } catch (e){
            throw e
        }
        
    } 
}