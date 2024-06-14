module.exports = function makeRemoveTest(db){
    return async function removeTest(test){
        try{
            return db.deleteTest(test._id)
        } catch (e){
            throw e
        }
        
    } 
}