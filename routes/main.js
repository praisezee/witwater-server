const express = require( 'express' );
const { home, getUser, deleteUser, editUser } = require( '../controllers/mainController' );
const router = express.Router()

router.get( '/', home )
router.patch('/', editUser)

router.route( '/:id' )
      .get( getUser )
      .delete( deleteUser )

module.exports = router


