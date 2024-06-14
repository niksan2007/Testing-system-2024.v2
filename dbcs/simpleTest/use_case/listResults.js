module.exports = function makeListResult(db){
    return async function listResult(id){
        try{
            return db.getAllResults(id)
            
        } catch (e){
            throw e
        }
        
    } 
}