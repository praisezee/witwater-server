const User = require('../model/Users')
const jwt = require( 'jsonwebtoken' )


const handleRefreshToken = async(req, res) =>
{
      const cookies = req.cookies;
      if ( !cookies?.jwt ) return res.sendStatus( 401 );
      const refreshToken = cookies.jwt
      
      const foundUser = await User.findOne( { refreshToken } ).exec();
      
      //Detection refresh token reuse
      if ( !foundUser ) return res.sendStatus( 403 );// forbidden 

      // evaluate jwt
      jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            ( err, decoded ) =>
            {
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
                  res.json({accessToken})
            }
      )
};

module.exports = { handleRefreshToken };