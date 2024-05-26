const r = require('express');
const userAuth = require("../middleware/userAuth");
const lecturerAuth = require('../middleware/lecturerAuth')
const controllers = require('../controllers/controllers')


studentRoute = new r.Router();


studentRoute.get("/tests",userAuth, controllers.UserCont.getTests);

studentRoute.get("/test/:id",userAuth, controllers.UserCont.getTestById);

studentRoute.post("/test",userAuth, controllers.UserCont.saveTest);


lectorRoute = new r.Router();

lectorRoute.post("/newTest",lecturerAuth, controllers.UserCont.createTest);

lectorRoute.put('/test/:id',lecturerAuth, controllers.UserCont.updateTest)

lectorRoute.delete('/test/:id',lecturerAuth, controllers.UserCont.deleteTest)

lectorRoute.get('/tests',lecturerAuth, controllers.UserCont.getTests)

lectorRoute.get('/test/:id',lecturerAuth, controllers.UserCont.getTestById)



module.exports = {lectorRoute, studentRoute}