const express = require("express");

const usersControllers = require("../controllers/users.controller");

const router = express.Router();

router.route("/login").post(usersControllers.login);
router.route("/login-otp").post(usersControllers.loginWithOtp);
router.route("/register").post(usersControllers.register);
router.route("/forgot-password").post(usersControllers.requestForgetPassword);
router.route("/change-password").post(usersControllers.changePassoword);
router.route("/user-phone-exists").post(usersControllers.checkUser);

module.exports = router;
