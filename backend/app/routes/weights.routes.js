const express = require("express");

const weightsControllers = require("../controllers/weights.controller");

const router = express.Router();

router
	.route("/user")
	.get(weightsControllers.getUserWeights)
	.post(weightsControllers.addUserWeights);

module.exports = router;
