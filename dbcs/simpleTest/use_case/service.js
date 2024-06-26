const makeAddTest = require('./addTest')
const makeEditTest = require('./editTest')
const makeGetResult = require('./getResultsById')
const makeGetTest = require('./getTestById')
const makeListResult = require('./listResults')
const makeListTest = require('./listTest')
const makeAddResult = require('./addResult')
const makeRemoveTest = require('./removeTest')
const makeGetResultByTopic = require('./getResultsByTopic')

const db = require('../data-access-layer/repository')


class TestService{

    addTest = makeAddTest(db.TestRepository)   
    editTest = makeEditTest(db.TestRepository)
    getTest = makeGetTest(db.TestRepository)
    listTest = makeListTest(db.TestRepository)
    removeTest = makeRemoveTest(db.TestRepository)
    
    getResultById = makeGetResult(db.ResultRepository)
    listResult = makeListResult(db.ResultRepository)
    addResult = makeAddResult(db)
    getResultByTopic = makeGetResultByTopic(db.ResultRepository)


}

module.exports = new TestService()