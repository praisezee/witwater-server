require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const app = express()
const { logger } = require( './middleware/logEvents' );
const cookieParser = require('cookie-parser')
const errorHandler = require( './middleware/errHandler' );
const corsOptions = require( './config/corsOptions' );
const credentials = require( './middleware/credentials' );
const filePayloadExist = require('./middleware/filePayloadExist')
const fileExtLimiter = require('./middleware/fileExtLimiter')
const fileSizeLimiter = require( './middleware/fileSizeLimiter' )
const fileUpload = require('express-fileupload')
const mongoose = require( 'mongoose' )
const connectDB = require( './config/dbConn' )


const PORT = process.env.PORT || 3500;

//connect to DB
connectDB();

//custom middleware
app.use( logger );

app.use( credentials );
app.options(cors(corsOptions))


app.use( cors(corsOptions) );



//built in middle where
// middleware for encoded data like form data
app.use( express.urlencoded( { extended: false } ) );
// middleware for json file
app.use( express.json() );
// middle ware for cookies
app.use( cookieParser() )
app.use('/uploads', express.static('image'))

app.get( '/', ( req, res, next ) =>
{
      res.send( 'Hello world' );
      next();
} );
app.use( '/register', require( './routes/register' ) );
app.use( '/auth', require( './routes/auth' ) );
app.use( '/refresh', require( './routes/refresh' ) );



app.use( '/user', require('./routes/main'));
app.use( '/logout', require( './routes/logout' ) );
app.use( '/posts', require( './routes/post' ) );
app.use( '/upload',
      fileUpload( { createParentPath: true } ),
      filePayloadExist,
      fileExtLimiter( [ '.png', '.jpg', '.jepg' ] ),
      fileSizeLimiter,
      require('./routes/upload')
);
app.use( '/conversation', require( './routes/conversations' ) )
app.use( '/message', require( './routes/messages' ) )

app.use( errorHandler );

mongoose.connection.once( 'open', () =>
{
      console.log( 'connected to mongoDB' );
      app.listen( PORT, () => console.log( `Server running on port ${ PORT }` ) );
})
