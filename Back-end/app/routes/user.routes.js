const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {

  app.get("/api/all", controller.allAccess);
  app.delete("/user/:id",[authJwt.verifyToken],controller.deleteUser);
};