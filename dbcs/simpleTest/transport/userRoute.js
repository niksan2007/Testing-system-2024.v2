const r = require('express');
const userAuth = require("../middleware/userAuth");
const lecturerAuth = require('../middleware/lecturerAuth')
const controllers = require('../controllers/controllers')




studentRoute = new r.Router();


studentRoute.get("/tests",userAuth, controllers.TestContoller.getTests);

studentRoute.get("/test/:id",userAuth, controllers.TestContoller.getTestById);

studentRoute.post("/test",userAuth, controllers.ResultController.createResult);


lectorRoute = new r.Router();

lectorRoute.get("/test",lecturerAuth, controllers.TestContoller.renderCreateTest);

<<<<<<< HEAD
lectorRoute.get('/constructor', lecturerAuth,controllers.TestContoller.renderClassicConstructor)


// lectorRoute.put('/test/:id',lecturerAuth, controllers.TestContoller.updateTest)

// lectorRoute.delete('/test/:id',lecturerAuth, controllers.TestContoller.deleteTest)

// lectorRoute.get('/tests',lecturerAuth, controllers.TestContoller.getTests)

=======
lectorRoute.get('/constructor', lecturerAuth,controllers.TestContoller.renderClassicConstructor);

lectorRoute.post('/test', controllers.TestContoller.createClassicTest);
>>>>>>> 3c829a699f244c405de1b97b0188075900d0e25a


lectorRoute.put('/test/:id',lecturerAuth, controllers.TestContoller.updateTest)

lectorRoute.delete('/test/:id',lecturerAuth, controllers.TestContoller.deleteTest)

lectorRoute.get('/tests',lecturerAuth, controllers.TestContoller.getTests)


module.exports = {lectorRoute, studentRoute}