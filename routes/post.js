const express = require( 'express' );
const router = express.Router();
const postController = require('../controllers/postController')



router.route( '/' )
      .get(postController.getPost)
      .post( postController.createPost )
      .patch( postController.editPost )
      

router.route( '/:id' )
      .get( postController.getSinglePost )
      .delete(postController.deletePost)
module.exports = router;