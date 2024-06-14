class UserTest{
    stud_id
    lector_id
    info_test
    query_answers
    quantity
    temp_queries

    constructor(stud_id,lector_id , info_test, query_answers, quantity, temp_queries){
        this.stud_id = stud_id
        this.lector_id = lector_id
        this.info_test = info_test
        this.query_answers = query_answers
        this.quantity = quantity
        this.temp_queries = temp_queries
    }
}

module.exports = UserTest