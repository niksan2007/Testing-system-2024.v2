const userTestClass = require('../entity/user-test')

//TODO::Прописать логику создания результата проверки
module.exports = function makeAddResult(db){
    return async function addResult(resInfo){
        const userTest = userTestClass(resInfo)
        return db.createTest(userTest)
    } 
}