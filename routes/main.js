const express = require( 'express' );
const { home, getUser, deleteUser } = require( '../controllers/mainController' );
const router = express.Router()

router.get( '/', home )

router.route( '/:id' )
      .get( getUser )
      .delete( deleteUser )

module.exports = router


