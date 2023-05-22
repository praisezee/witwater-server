const express = require( 'express' );
const { verifyEmail } = require( '../controllers/VerifyController' );
const router = express.Router();

router.post( '/', verifyEmail );

module.exports = router