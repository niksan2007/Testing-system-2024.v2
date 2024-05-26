module.exports = function makeListResult(db){
    return async function listResult(){
        return db.getAllResults()
    } 
}