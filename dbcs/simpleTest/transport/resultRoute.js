const r = require('express');
const userAuth = require("../middleware/userAuth");
const lecturerAuth = require('../middleware/lecturerAuth')
const expressCallback = require('../middleware/expressCallback')


resultRoute = new r.Router();

const controllers = require('../controllers/controllers');


resultRoute.get("/result/:userId", userAuth, expressCallback(controllers.TestController));
resultRoute.get("/result", lecturerAuth, expressCallback(controllers.TestController))


module.exports = resultRoute;