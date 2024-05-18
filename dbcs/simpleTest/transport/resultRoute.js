const r = require('express');
const userAuth = require("../middleware/userAuth");
const lecturerAuth = require('../middleware/lecturerAuth')
const expressCallback = require('../middleware/expressCallback')


resultRoute = new r.Router();

const controllers = require('../controllers/controllers');


resultRoute.get("/result/:userId", userAuth, expressCallback(controllers.TestCont));
resultRoute.get("/result", lecturerAuth, expressCallback(controllers.TestCont))


module.exports = resultRoute;