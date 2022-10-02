const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.route("/").get(controller.getUser);
router.route("/signup").post(controller.signup)
router.route("/login").post(controller.login)


module.exports = router;
