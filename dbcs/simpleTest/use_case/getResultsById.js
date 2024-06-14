module.exports = function makeGetResult(db){
    return async function getResult(id){
        try{
            return db.getUserResult(id)
            
        } catch (e){
            throw e
        }
        
    } 
}