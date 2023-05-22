
const Users = require( '../model/Users' );

const verifyCode = async ( req, res ) =>
{
      try {
            const { email, code } = req.body
            const user = await Users.findOne( { email } )
            if ( user.verifyCode !== code ) res.status( 400 ).json( { 'message': 'Invalid Verification code' } )
            
            user.updateOne( { email }, { $set: { verifyEmail: true } } )
            res.status(200)
      } catch (err) {
            res.status(500).send('internal server error')
      }
};

module.exports = {verifyCode}