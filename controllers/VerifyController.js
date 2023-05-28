const nodeMailer = require( 'nodemailer' );
const cryptoRandomString = require( 'crypto-random-string' );
const Users = require( '../model/Users' );

const verifyEmail = async ( req, res ) =>
{
      try {
            const { email } = req.body
            // random generated code
            const code = cryptoRandomString( { length: 6, type: 'alphanumeric' } )
            const user = await Users.findOne( { email } )
            //nodemailer transporter
            const transporter = nodeMailer.createTransport( {
                  service: 'gmail',
            auth: {
                  user: 'folorunsopraise580@gmail.com',
                  pass:'lbimoesmecpqtwkb'
            },
            tls: {
                  rejectUnauthorized:false
            }
            } )
            const mailOption = {
                  from:process.env.EMAIL,
                  to: email,
                  subject: 'Verify your Email',
                  text: `We noticed that you registered on witwater. your verification code is ${code}`
            }

            await transporter.sendMail( mailOption )
            
            user.verifyCode = code;
            await user.save()

      res.status(201).json({'message': 'verification code sent to email'})
      } catch (err) {
            res.status(500).send('internal server error')
      }
};



module.exports = {verifyEmail}