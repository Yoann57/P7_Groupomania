const commentCtrl = require('../controllers/comment');
const {
  authJwt
} = require("../middleware");

module.exports = function (app) {
 
  app.get('/comments', [authJwt.verifyToken], commentCtrl.getAllComments);
  app.get('/comment/:id', [authJwt.verifyToken], commentCtrl.getOneComment);
  app.delete('/comment/:id', [authJwt.verifyToken], commentCtrl.deleteComment);
  app.post('/posts/:id/comment', [authJwt.verifyToken], commentCtrl.addComment);
}