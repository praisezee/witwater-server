const uploadImg = require('../controllers/uploadController');

const express = require( 'express' );
const router = express.Router();

router.post('/', uploadImg)

export default router