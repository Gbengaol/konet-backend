const express = require('express');
const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  // .patch(postController.updatePost)
  .delete(postController.deletePost);

router
  .route('/:id/like')
  .patch(postController.likePost)
router
  .route('/:id/unlike')
  .patch(postController.unlikePost)

module.exports = router;
