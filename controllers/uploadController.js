const path = require( 'path' )
const User = require('../model/Users')

const uploadImg = async ( req, res ) =>
{ 
      const id = req.body;
      const files = req.files;
      const foundUser = await User.findOne( { _id: id } ).exec()
      if ( !foundUser ) return res.sendStatus( 401 );
      console.log( files );
      Object.keys( files ).forEach( key =>
      {
            const filepath = path.join( __dirname, 'image', files[ key ].name )
            files[ key ].mv( filepath, ( err ) =>
            {
                  if (err) return res.status(500).json({status: 'error', message: err})
            } )
            foundUser.src = filepath
            
      } )
      await foundUser.save()
      return res.json({status: 'success', message: Object.keys(files).toString()})
};

module.exports = uploadImg