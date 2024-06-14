module.exports = function makeEditTest(db){
    return async function editTest(test){
        try{
            return db.updateTest(test)
            
        } catch (e){
            throw e
        }
    } 
}