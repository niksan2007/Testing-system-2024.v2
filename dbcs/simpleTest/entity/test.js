class Test{
    _id
    lectorId
    numberQues
    numberRemaining
    topic
    problemStatement
    problemPreview
    problemSolution
    scriptTable
    scriptTableData
    image
    token_test
    answerOptions

 

    constructor(_id,lectorId,  numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable,scriptTableData,image, token_test, answerOptions){
        this._id = _id
        this.lectorId = lectorId
        this.numberQues = numberQues
        this.numberRemaining = numberRemaining
        this.topic = topic
        this.problemStatement = problemStatement
        this.problemPreview = problemPreview
        this.problemSolution = problemSolution
        this.scriptTable = scriptTable
        this.scriptTableData = scriptTableData
        this.image = image
        this.token_test = token_test
        this.answerOptions = answerOptions
    }

}

module.exports = Test