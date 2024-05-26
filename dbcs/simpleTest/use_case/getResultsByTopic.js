module.exports = function makegetResultByTopic(db){
    return async function getResultByTopic(topic){
        try{
            return db.getResultByTopic(topic)
            
        } catch (e){
            throw e
        }
        
    } 
}