const express = require("express");

const medsControllers = require("../controllers/meds.controller");

const router = express.Router();

router
	.route("/user")
	.get(medsControllers.getUserMedications)
	.post(medsControllers.addMedications);

module.exports = router;
