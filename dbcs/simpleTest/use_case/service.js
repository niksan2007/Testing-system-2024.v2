const makeAddTest = require('./addTest')
const makeCheckResult = require('./checkResult')
const makeEditTest = require('./editTest')
const makeGetResult = require('./getResultsById')
const makeGetTest = require('./getTestById')
const makeListResult = require('./listResults')
const makeListTest = require('./listTest')
const makeAddResult = require('./addResult')
const makeRemoveTest = require('./removeTest')

const db = require('../data-access-layer/repository')


class TestService{

    addTest = makeAddTest(db)   
    editTest = makeEditTest(db)
    getTest = makeGetTest(db)
    listTest = makeListTest(db)
    removeTest = makeRemoveTest(db)
    
    getResultById = makeGetResult(db)
    listResult = makeListResult(db)
    addResult = makeAddResult(db)
    checkResult = makeCheckResult(db)


}

module.exports = new TestService()