const allowedOrigins = require('./allowedOrigins')
const corsOptions = {
      origin: function ( origin, callback ) 
      {
            if ( allowedOrigins.indexOf( origin ) !== -1 || !origin ) {
                  callback( null, true );
            } else {
                  callback( new Error( 'Not allow by cors' ) );
            }
      },
      optionsSuccessStatus: 200
};

module.exports = corsOptions