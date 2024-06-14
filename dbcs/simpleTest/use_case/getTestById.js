module.exports = function makeGetTest(db) {
    return async function getTest(testId) { // Принимаем только testId
        try {
            return db.getTestById(testId); // Передаем testId
        } catch (e) {
            throw e;
        }
    };
};