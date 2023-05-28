
const Users = require( '../model/Users' );

const verifyCode = async ( req, res ) =>
{
      try {
            const { email, code } = req.body
            if(!email || !code ) return res.status(400).json({"message": "All feild must be field"})
            const user = await Users.findOne( { email } )
            if ( user.verifyCode !== code ) res.status( 400 ).json( { 'message': 'Invalid Verification code' } )
            user.isVerifired = true;
            await user.save();
            res.status(200).json({"message": "email verified"})
      } catch (err) {
            res.status(500).send('internal server error')
      }
};

module.exports = {verifyCode}