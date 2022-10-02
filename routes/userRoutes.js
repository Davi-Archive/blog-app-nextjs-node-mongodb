const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.route("/").get(controller.getUser);
router.route("/signup").post(controller.signup)

module.exports = router;
