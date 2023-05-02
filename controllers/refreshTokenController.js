const User = require('../model/Users')
const jwt = require( 'jsonwebtoken' )


const handleRefreshToken = async(req, res) =>
{
      const cookies = req.cookies;
      if ( !cookies?.jwt ) return res.sendStatus( 401 );
      const refreshToken = cookies.jwt
      res.clearCookie('jwt', {
                  httpOnly: true,
                  sameSite: 'None',
                  secure: true
      } )
      
      const foundUser = await User.findOne( { refreshToken } ).exec();
      
      //Detection refresh token reuse
      if ( !foundUser ) {
            jwt.verify(
                  refreshToken,
                  process.env.REFRESH_TOKEN_SECRET,
                  async ( err, decoded ) =>
                  {
                        if ( err ) return res.sendStatus( 403 );// forbidden
                        const hackedUser = await User.findOne( { email: decoded.email } ).exec();
                        hackedUser.refreshToken = [];
                        await hackedUser.save()
                  }
            )
            return res.sendStatus( 403 );// forbidden
      } 

      const newRefreshTokenArray = foundUser.refreshToken.filter( rt => rt !== refreshToken );
      // evaluate jwt
      jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async ( err, decoded ) =>
            {
                  if ( err ) {
                        foundUser.refreshToken = [ ...newRefreshTokenArray ];
                        await foundUser.save()
                  }
                  if ( err || foundUser.email !== decoded.email ) res.sendStatus( 403 );
                  const accessToken = jwt.sign(
                        { "email": decoded.email  },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30s' }
                  );
                  const safe = {
                        id: foundUser._id,
                        name: foundUser.fullname,
                        email: foundUser.email,
                        gender: foundUser.gender,
                        role: foundUser.role,
                        city: foundUser.city,
                        state: foundUser.state,
                        phoneNumber: foundUser.phoneNumber,
                        accessToken
                  }
                  const newRefreshToken = jwt.sign(
                  { "email": foundUser.email  },
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: '1d' }
            );
            // saving refresh token with current user
                  foundUser.refreshToken = [ ...newRefreshTokenArray, newRefreshToken ];
                  await foundUser.save()
                  res.cookie( 'jwt', newRefreshToken, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000,
                  sameSite: 'None',
                  secure: true
            } );
                  res.json(safe)
            }
      )
};

module.exports = { handleRefreshToken };