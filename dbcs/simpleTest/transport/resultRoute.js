const r = require('express');
const userAuth = require("../middleware/userAuth");
const lecturerAuth = require('../middleware/lecturerAuth')
const controllers = require('../controllers/controllers')


resultRoute = new r.Router();


resultRoute.get("/result/:testTopic", lecturerAuth, controllers.ResultController.getResultBy);
resultRoute.get("/result", lecturerAuth, controllers.ResultController.getResults);
resultRoute.get("/result/:id", userAuth, controllers.ResultController.getResultBy); 



module.exports = resultRoute;