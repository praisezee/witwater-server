const express = require( 'express' );
const { getSinglePostOfUser } = require( '../controllers/userPostController' );
const router = express.Router();



router.get('/:id',getSinglePostOfUser)

module.exports = router;