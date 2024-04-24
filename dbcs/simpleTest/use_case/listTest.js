module.exports = function makeListTest(db){
    return async function listTest(){
        return db.getTests()
    } 
}