const r = require('express');
studentRoute = new r.Router();

const StudentController = require('../controlers/StudentController')

studentRoute.get("/tests", StudentController.getTests);

studentRoute.get("/test/:id", StudentController.getTestById);

studentRoute.post("/test", StudentController.endTest);


module.exports = studentRoute;