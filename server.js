require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const app = express()
const { logger } = require( './middleware/logEvents' );
const cookieParser = require('cookie-parser')
const errorHandler = require( './middleware/errHandler' );
const corsOptions = require( './config/corsOptions' );
const credentials = require( './middleware/credentials' );
const mongoose = require( 'mongoose' )
const connectDB = require('./config/dbConn')

const PORT = process.env.PORT || 3500;


//connect to DB
connectDB();

//custom middleware
app.use( logger );

app.use( credentials );


app.use( cors(corsOptions) );



//built in middle where
// middleware for encoded data like form data
app.use( express.urlencoded( { extended: false } ) );
// middleware for json file
app.use( express.json() );
// middle ware for cookies
app.use(cookieParser())

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
app.use( '/conversation', require( './routes/conversation' ) )

app.use( errorHandler );

mongoose.connection.once( 'open', () =>
{
      console.log( 'connected to mongoDB' );
      app.listen( PORT, () => console.log( `Server running on port ${ PORT }` ) );
})
