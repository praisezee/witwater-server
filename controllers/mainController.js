const User = require( '../model/Users' )
const Post = require('../model/Post')
const Conversation = require('../model/Conversation')
const Message = require( '../model/Message' )
const jwt = require( 'jsonwebtoken' )

const home = async ( req, res ) =>
{
      const users = await User.find()
      if ( !users ) return res.sendStatus( 204 ).json( { 'message': 'no user' } )
      const safe = users.map( user =>
      {
            const details = {
                  id: user._id,
                  name: user.fullname,
                  email: user.email,
                  gender: user.gender,
                  role: user.role,
                  city: user.city,
                  state: user.state,
                  phoneNumber: user.phoneNumber,
                  src: user.src
            }
            return details
      })
      res.json(safe)
};

const getUser = async ( req, res ) =>
{
      const {id} = req.params;
      if ( !id ) return res.sendStatus( 400 ).json( { "message": "User id required" } )
      const user = await User.findOne( { _id: id } ).exec()
      if ( !user ) return res.sendStatus( 400 ).json( { "message": "User not found" } )
      const safe = {
            id: user._id,
            name: user.fullname,
            email: user.email,
            gender: user.gender,
            role: user.role,
            city: user.city,
            state: user.state,
            src: user.src,
            phoneNumber: user.phoneNumber}
      res.json(safe)
}

const editUser = async (req,res) =>
{
      const {id, name, email, gender, role, city, state, phoneNumber } = req.body;
      const foundUser = await User.findOne( { _id: id } )
      if ( !foundUser ) res.status( 401 ).json( { 'message': 'user not found' } )
      foundUser.fullname = name
      foundUser.email = email
      foundUser.gender = gender
      foundUser.role = role
      foundUser.city = city
      foundUser.phoneNumber = phoneNumber
      foundUser.state = state

      await foundUser.save()
      const accessToken = jwt.sign(
                  { "email": foundUser.email },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: '10s' }
            );
      const result = {
                  "id" : foundUser._id,
                  "name": foundUser.fullname,
                  "email": foundUser.email,
                  "gender" : foundUser.gender,
                  "phoneNumber": foundUser.phoneNumber,
                  "role": foundUser.role,
                  "state": foundUser.state,
                  "city": foundUser.city,
                  "accessToken": accessToken,
                  "src": foundUser.src
            }
      res.json(result)

}

const deleteUser = async ( req, res ) =>
{
      const { id } = req.params
      if ( !id ) return res.sendStatus( 400 ).json( { "message": "User id required" } )
      await User.deleteOne( { _id: id } ).exec()
      await Conversation.deleteMany( {
                  members: {$in:[id]}
      } ).exec()
      await Post.deleteMany( {
            senderId: id
      } ).exec()
      res.sendStatus( 200 )
      console.log(`user with id:${id} was deleted`)
}



module.exports = {
      home,
      getUser,
      deleteUser,
      editUser
};