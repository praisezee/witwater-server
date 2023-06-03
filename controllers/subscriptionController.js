const Flutterwave = require('flutterwave-node-v3')

const flutterwave = new Flutterwave( process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY ); 

const createSubscription = async ( req, res ) =>
{
      try {
            const { email } = req.body
            const subscription = await flutterwave.Subscription.get( { email } )
            res.json( {
                  data: subscription.data
            })
      } catch (error) {
            console.error(error);
            res.status(500).json({
            success: false,
            message: 'An error occurred during subscription creation.',
      });
      }
}






module.exports= {createSubscription}