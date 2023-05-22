require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const app = express()
const http = require('http')
const { logger } = require( './middleware/logEvents' );
const cookieParser = require('cookie-parser')
const errorHandler = require( './middleware/errHandler' );
const corsOptions = require( './config/corsOptions' );
const credentials = require( './middleware/credentials' );
const filePayloadExist = require('./middleware/filePayloadExist')
const fileExtLimiter = require('./middleware/fileExtLimiter')
const fileSizeLimiter = require( './middleware/fileSizeLimiter' )
const verifyJwt = require('./middleware/verifyJwt')
const fileUpload = require('express-fileupload')
const mongoose = require( 'mongoose' )
const connectDB = require( './config/dbConn' )
const {Server} = require('socket.io')
const PORT = process.env.PORT || 3500;

const httpServer = http.createServer( app )


//cors

app.use( credentials );
app.options(cors(corsOptions))


const io = new Server( httpServer, {
      cors: {
            origin: '*',
            methods:["GET", "POST"]
      }
} )


let users = []

const addUser = ( userId, socketId ) =>
{
      !users.some( user => user.userId === userId ) && 
            users.push({userId, socketId})
}

const removeUser = ( socketId ) =>
{
      users = users.filter(user => user.socketId !== socketId)
}

const getUser = ( userId ) =>
{
      return users.find(user=> user.userId === userId)
}

io.on( 'connection', ( socket ) =>
{
      // when connected
      console.log( 'a user connected' )
      socket.on( "addUser", userId =>
      {
            addUser( userId, socket.id );
            io.emit( 'getUsers', users )
      } )

      //send and get message
      socket.on( 'sendMessage', ( { senderId, receiverId, text } ) =>
      {
            const user = getUser( receiverId );
            io.to( user.socketId ).emit( 'getMessage', {
                  senderId, text
            })
      })

      //when disconnected
      socket.on( 'disconnet', () =>
      {
            console.log( 'a user disconnected' );
            removeUser( socket.id )
            io.emit( 'getUsers', users );
      })
} );
//connect to DB
connectDB();

//custom middleware
//app.use( logger );



app.use( cors(corsOptions) );


//built in middle where
// middleware for encoded data like form data
app.use( express.urlencoded( { extended: true, limit: '200mb' } ) );
// middleware for json file
app.use( express.json({limit:'200mb'}) );
// middle ware for cookies
app.use( cookieParser() )
app.use('/upload', express.static('image'))

app.get( '/', ( req, res, next ) =>
{
      res.send( 'Hello world' );
      next();
} );
app.use( '/register', require( './routes/register' ) );
app.use( '/auth', require( './routes/auth' ) );
app.use( '/refresh', require( './routes/refresh' ) );
app.use( '/user', require( './routes/main' ) );
app.use( '/logout', require( './routes/logout' ) );
app.use('/verify-mail', require('./routes/VerifyMail'))
app.use('/verify-code', require('./routes/VerifyCode'))


//app.use(verifyJwt)



app.use( '/posts', require( './routes/post' ) );
app.use('/comment', require('./routes/comment'))
app.use('/userPost', require('./routes/userPost'))
/* app.use( '/upload',
      fileUpload( { createParentPath: true } ),
      filePayloadExist,
      fileExtLimiter( [ '.png', '.jpg', '.jepg' ] ),
      fileSizeLimiter,
      require('./routes/upload')
); */
app.use( '/upload', require('./routes/upload'))

app.use( '/conversation', require( './routes/conversations' ) )
app.use( '/message', require( './routes/messages' ) )

app.use( errorHandler );

mongoose.connection.once( 'open', () =>
{
      console.log( 'connected to mongoDB' );
      httpServer.listen( PORT, () => console.log( `Server running on port ${ PORT }` ) );
})
