const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const {
  authJwt
} = require("../middleware");

module.exports = function (app) {

  app.get(
    "/posts",
    [authJwt.verifyToken],
    postCtrl.getAllPosts
  );
  app.post('/posts', [authJwt.verifyToken], multer, postCtrl.createPost);
  app.get('/posts/:id', [authJwt.verifyToken], postCtrl.getOnePost);
  app.put('/posts/:id', [authJwt.verifyToken], multer, postCtrl.modifyPost);
  app.delete('/posts/:id', [authJwt.verifyToken], postCtrl.deletePost);
}