const r = require('express');
const lecturerAuth = require("../../middleware/lecturerAuth");
const LectorController = require('../controlers/LectorController');

//TODO::Добавить проверку на преподавателя
lectorRoute = new r.Router();

lectorRoute.post("/newTest", LectorController.createTest);

lectorRoute.put('/test/:id',LectorController.updateTest)

lectorRoute.delete('/test/:id',LectorController.deleteTest)

lectorRoute.get('/tests',LectorController.getTests)

lectorRoute.get('/test/:id',LectorController.getTestById)



module.exports = lectorRoute;