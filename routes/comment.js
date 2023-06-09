const express = require( 'express' );
const { getComment, postComment, deleteComment } = require( '../controllers/commentController' );
const router = express.Router();

router.route( '/' )
      .post( postComment )

router.route( '/:id' )
      .get( getComment )
      .delete( deleteComment )
      

module.exports = router