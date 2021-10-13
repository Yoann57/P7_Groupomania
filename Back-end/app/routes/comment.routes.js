// const express = require('express');
// const router = express.Router();
// const commentCtrl = require('../controllers/comment');

// const authJwt = require("../middleware");


// router.get('/:id', authJwt.checkToken, commentCtrl.getOneComment);
// router.delete('/:id', authJwt.checkToken, commentCtrl.deleteComment);
// router.put('/:id', authJwt.checkToken, commentCtrl.modifyComment);

// module.exports = router;

const commentCtrl = require('../controllers/comment');

const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
app.get('/:id', [authJwt.verifyToken], commentCtrl.getOneComment);
app.delete('/:id', [authJwt.verifyToken], commentCtrl.deleteComment);
app.put('/:id', [authJwt.verifyToken], commentCtrl.modifyComment);
}
