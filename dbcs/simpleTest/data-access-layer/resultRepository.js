const repStud = require('../../models/replyStudModel')

class ResultRepository{

    async getAllResults(lecturerId){
        const res = await repStud.find({ lector_id: lecturerId });
        return res
    }

    async getUserResult(user_id){
        if(!user_id){
            throw new Error('Не указан ID');
        }
        return await repStud.find({stud_id:user_id})
    }

    async addResult(result){
        const res = await repStud.create(result);
        return res;
    }

    async getResultByTopic(testTopic){
        return await repStud.aggregate([
            { $match: { "info_test.test_topic": testTopic } },
            {
                $lookup: {
                    from: "users",
                    localField: "stud_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: "$stud_id",
                    name: "$user.name",
                    surname: "$user.surname",
                    group: "$user.group_name",
                    correctAnswers: { $arrayElemAt: ["$quantity.correct_ans", 0] },
                    totalQuestions: { $add: [{ $arrayElemAt: ["$quantity.correct_ans", 0] }, { $arrayElemAt: ["$quantity.incorrect_ans", 0] }] },
                    percentage: {
                        $multiply: [
                            { $divide: [{ $arrayElemAt: ["$quantity.correct_ans", 0] }, { $add: [{ $arrayElemAt: ["$quantity.correct_ans", 0] }, { $arrayElemAt: ["$quantity.incorrect_ans", 0] }] }] },
                            100
                        ]
                    }
                }
            }
        ]);
    }
}

module.exports = new ResultRepository()