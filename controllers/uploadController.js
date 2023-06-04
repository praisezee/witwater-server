const User = require( '../model/Users' )
const cloudinary = require('../config/cloudinary')

const uploadImg = async ( req, res ) =>
{ 

      const { profile, id } = req.body;
      
      if (!profile || !id) {
            return res.status(400).json({ error: 'Image file and ID are required.' });
      }
      try {
            const result = await cloudinary.uploader.upload( profile, {
                  folder: 'profiles',
                  eager: {
                        width: 200,
                        height: 200,
                        crop:"scale"
                  }
            })
      const foundUser = await User.findOne( { _id: id } ).exec()
      if ( !foundUser ) return res.sendStatus( 401 );
      console.log( profile )
            foundUser.src = result.secure_url
      await foundUser.save()
      const imgageUrl = foundUser.src
      return res.status(200).json({imgageUrl})
      } catch (err) {
            console.log(err)
      }
};

module.exports = uploadImg