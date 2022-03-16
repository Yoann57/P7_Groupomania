// const express = require('express');
// const router = express.Router();
// const postCtrl = require('../controllers/post');
// const commentCtrl = require('../controllers/comment');

// const authJwt = require("../middleware");
// const multer = require('../middleware/multer-config');

// router.get('/', authJwt.checkToken, postCtrl.getAllPosts);
// router.post('/', authJwt.checkToken, multer, postCtrl.createPost);
// router.get('/:id', authJwt.checkToken, postCtrl.getOnePost);
// router.put('/:id', authJwt.checkToken, multer, postCtrl.modifyPost);
// router.delete('/:id', authJwt.checkToken, postCtrl.deletePost);
// router.post('/:id/like', authJwt.checkToken, postCtrl.likePost);
// router.post('/:id/comment', authJwt.checkToken, commentCtrl.addComment);

// module.exports = router;

//////////////////////////////////////////::
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
  app.post('/posts/like', [authJwt.verifyToken], postCtrl.likePost);

}
