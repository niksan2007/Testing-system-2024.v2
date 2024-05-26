const userTestClass = require('../entity/user-test')

module.exports = function makeGetResult(db){
    return async function getResult(resultInfo){
        const res = userTestClass(resultInfo)
        try{
            return db.getTestById(res.stud_id)
            
        } catch (e){
            throw e
        }
        
    } 
}