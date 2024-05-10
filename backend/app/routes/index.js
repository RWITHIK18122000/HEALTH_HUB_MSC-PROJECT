const { Router } = require("express");

const testRoutes = require("./test.routes");
const userRoutes = require("./users.routes");
const medsRoutes = require("./meds.routes");
const weightRoutes = require("./weights.routes");
const appointmentsRoutes = require("./appointments.routes");

const authMiddleware = require("../middlewares/auth");

const router = Router();

router.use("/", testRoutes);
router.use("/users", userRoutes);
router.use("/meds", authMiddleware, medsRoutes);
router.use("/weights", authMiddleware, weightRoutes);
router.use("/appointments", authMiddleware, appointmentsRoutes);

module.exports = router;
