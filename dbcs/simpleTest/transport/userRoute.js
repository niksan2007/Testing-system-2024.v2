const r = require('express');
const userAuth = require("../middleware/userAuth");
const lecturerAuth = require('../middleware/lecturerAuth')
const controllers = require('../controllers/controllers')


userRoute = new r.Router();


userRoute.get("/tests",userAuth, controllers.UserConroller.getTests);

userRoute.get("/test/:id",userAuth, controllers.UserConroller.getTestById);

userRoute.post("/test",userAuth, controllers.UserConroller.endTest);


lectorRoute = new r.Router();

lectorRoute.post("/newTest",lecturerAuth, LectorController.createTest);

lectorRoute.put('/test/:id',lecturerAuth, LectorController.updateTest)

lectorRoute.delete('/test/:id',lecturerAuth, LectorController.deleteTest)

lectorRoute.get('/tests',lecturerAuth, LectorController.getTests)

lectorRoute.get('/test/:id',lecturerAuth, LectorController.getTestById)



module.exports = {lectorRoute, studentRoute}