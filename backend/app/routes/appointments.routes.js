const express = require("express");

const appointmentsControllers = require("../controllers/appointment.controller");

const router = express.Router();

router
	.route("/user")
	.get(appointmentsControllers.getUserApps)
	.post(appointmentsControllers.addUserApp);

module.exports = router;
