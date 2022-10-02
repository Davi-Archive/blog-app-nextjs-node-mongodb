const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/",controller.getAllBlogs);
router.post("/add", controller.addBlog);
router.put("/update/:id", controller.updateBlog);
router.get("/:id", controller.getById);
router.delete("/:id", controller.deleteBlog);
router.get('/user/:id', controller.getByUserId)

module.exports = router;
