const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');

const postCtrl = require('../controllers/posts.js');

router.get('/', postCtrl.getAllPosts);
router.post('/create', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.editPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;