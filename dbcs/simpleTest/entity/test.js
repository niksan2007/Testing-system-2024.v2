class Test{
    _id
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

    constructor(_id, numberQues, numberRemaining, topic, problemStatement, problemPreview, problemSolution, scriptTable,scriptTableData,image, token_test){
        this._id = _id
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
    }

}

module.exports = Test