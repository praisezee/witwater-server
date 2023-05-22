const User = require('../model/Users')
const bcrypt = require( 'bcrypt' );

const createNewUser = async ( req, res ) =>
{
      const { name, gender, role, state, city, email, phoneNumber, password } = req.body;
      if ( !name || !gender || !role || !state || !city || !email || !phoneNumber || !password ) { return res.status( 400 ).json( { 'message': 'All field are required' } ); };
      // check for duplicate email and phone number
      const duplicate = await User.findOne({email} || {phoneNumber}).exec();
      if ( duplicate ) {
            return res.sendStatus( 409 );//conflict
      } 
      else { 

      try {
            //Praise1212.
            // hasshing the password
            const hashedPwd = await bcrypt.hash( password, 10 )
            // create and store store the new user
            const result = await User.create({
                  "fullname": name,
                  "gender": gender,
                  "role": role,
                  "state": state,
                  "city": city,
                  "email": email,
                  "phoneNumber": phoneNumber,
                  "password": hashedPwd,
                  "src": '',
                  'isVerifired': false,
                  'verifyCode':''
            });
            console.log(result);
            res.status( 201 ).json( { 'success': `New user ${ name } created` } );
      } catch (err) {
            res.status( 500 ).json( { 'message': err.message } );
            }
      }
};


module.exports = { createNewUser };