const userTestClass = require('../entity/user-test')


//TODO::Прописать логику проверки тестов
module.exports = function makeCheckResult(db){
    return async function checkResult(resInfo){
        const userTest = userTestClass(resInfo)
        return db.createTest(userTest)
    } 
}