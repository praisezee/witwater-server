const User = require('../model/Users')
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' )

const handleLogin = async (req, res) =>
{
      const cookies = req.cookies
      const { email, password } = req.body;
      if ( !email || !password ) { return res.status( 400 ).json( { 'message': 'All field are required' } ); };
      const foundUser = await User.findOne({email}).exec();
      if ( !foundUser ) return res.sendStatus( 401 ); // unauthorized
      // evaluate password
      const match = await bcrypt.compare( password, foundUser.password )
      if ( match ) {
            // create jwt
            const accessToken = jwt.sign(
                  { "email": foundUser.email },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: '30s' }
            );
            const newRefreshToken = jwt.sign(
                  { "email": foundUser.email  },
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: '1d' }
            );

            const newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter( rt => rt !== cookies.jwt );

            if(cookies?.jwt) res.clearCookie('jwt', {
                  httpOnly: true,
                  sameSite: 'None',
                  secure: true
            })
            // saving refresh token with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const source = foundUser.src !== '' ? `http://localhost:3500/${foundUser.src}`: '' 
            const user = {
                  "id" : foundUser._id,
                  "name": foundUser.fullname,
                  "email": foundUser.email,
                  "phoneNumber": foundUser.phoneNumber,
                  "role": foundUser.role,
                  "state": foundUser.state,
                  "city": foundUser.city,
                  "accessToken": accessToken,
                  "src": source
            }
            await foundUser.save();

            res.cookie( 'jwt', newRefreshToken, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000,
                  sameSite: 'None',
                  secure: true
            } );
            res.json(user);
      } else {
            res.sendStatus( 401 );
      }
};

module.exports = { handleLogin };