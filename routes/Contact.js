const express = require( 'express' );
const nodemailer = require('nodemailer')
const router = express.Router();

router.post( '/', async ( req, res ) =>
{
      const { surname, firstname, phoneNumber, email, message } = req.body;
      if ( !surname || !firstname || !phoneNumber || !email || !message ) return res.status( 400 ).json( { "message": "All feild is required" } )

      try {
            
            const transporter = nodemailer.createTransport( {
            service: 'gmail',
            auth: {
                  user: 'folorunsopraise580@gmail.com',
                  pass:'lbimoesmecpqtwkb'
            },
            tls: {
                  rejectUnauthorized:false
            }
      } )
      const html = `
      <p>Someone reached out to witwater</p>
      <h4>Name: ${firstname} ${surname}</h4>
      <h4>Phone number: ${phoneNumber} </h4>
      <h4>Email: ${email} </h4>
      <h6>${message}</h6>
      `
            
            await transporter.sendMail( {
            from: email,
            to: ['thewitwater@gmail.com','folorunsopraise12@gmail.com'],
            subject: `${firstname} contacted you through your website`,
            html
            } );
            console.log( 'message sent' );
            res.status(200).json(html)
      } catch (err) {
            console.log( err )
            res.status(500).json({"message":"Internal server error"})
      }
} );

module.exports = router