const express = require( 'express' );
const { home, getUser } = require( '../controllers/mainController' );
const router = express.Router()

router.get( '/', home )

router.get( '/:id', getUser)

module.exports = router


