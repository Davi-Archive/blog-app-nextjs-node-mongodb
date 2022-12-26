const userController = require("./userController");
const blogController = require("./blogController");

module.exports = {
  ...userController,
  ...blogController,
};
