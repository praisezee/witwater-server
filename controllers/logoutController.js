const User = require('../model/Users')

const handleLogout = async (req, res) =>
{
      //on client also delete the accessToken
      const cookies = req.cookies;
      if ( !cookies?.jwt ) return res.sendStatus( 204 ); // no content
      const refreshToken = cookies.jwt
      
      //is refresh token in db
      const foundUser = await User.findOne( {refreshToken} );
      if ( !foundUser ) {
            res.clearCookie('jwt', {
                  httpOnly: true,
                  sameSite: 'None',
                  secure: true
            })
            return res.sendStatus( 204 );
      }
      // delete refreshToken in db
      foundUser.refreshToken = ''
      const result = await foundUser.save()
      console.log(result);
      res.clearCookie( 'jwt', { httpOnly: true } ); // secure: true for only https
      res.sendStatus(204)
};


module.exports = { handleLogout };