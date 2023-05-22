const express = require( 'express' );
const { verifyCode } = require( '../controllers/verifyCode' );
const router = express.Router();

router.post( '/', verifyCode );

module.exports = router