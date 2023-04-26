const express = require( 'express' );
const router = express.Router();
const postController = require('../controllers/postController')



router.route( '/' )
      .get(postController.getPost)
      .post( postController.createPost )
      .patch( postController.editPost )
      .delete(postController.deletePost)

router.route( '/:id' )
      .get( postController.getSinglePost )
      .post(postController.postComment)
module.exports = router;