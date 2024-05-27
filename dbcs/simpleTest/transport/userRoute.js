const r = require('express');
const userAuth = require("../middleware/userAuth");
const lecturerAuth = require('../middleware/lecturerAuth')
const controllers = require('../controllers/controllers')




studentRoute = new r.Router();


studentRoute.get("/tests",userAuth, controllers.TestContoller.getTests);

studentRoute.get("/test/:id",userAuth, controllers.TestContoller.getTestById);

studentRoute.post("/test",userAuth, controllers.ResultController.createResult);


lectorRoute = new r.Router();

lectorRoute.get("/test",lecturerAuth, controllers.TestContoller.renderCreateTest);// +

lectorRoute.get('/constructor', lecturerAuth,controllers.TestContoller.renderClassicConstructor)//+

lectorRoute.post('/test', lecturerAuth, controllers.TestContoller.createClassicTest)//+

lectorRoute.put('/test/:id',lecturerAuth, controllers.TestContoller.updateTest)

lectorRoute.delete('/test/:id',lecturerAuth, controllers.TestContoller.deleteTest)

lectorRoute.get('/tests',lecturerAuth, controllers.TestContoller.getTests)







module.exports = {lectorRoute, studentRoute}