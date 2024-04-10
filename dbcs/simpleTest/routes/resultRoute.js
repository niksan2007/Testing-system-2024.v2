const r = require('express');
resultRoute = new r.Router();

const ResultController = require('../controlers/ResultController');


resultRoute.get("/result/:userId", ResultController.getResults);


module.exports = resultRoute;