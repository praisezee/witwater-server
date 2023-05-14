const User = require('../model/Users')

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
                  phoneNumber: user.phoneNumber}
      res.json(safe)
}

const deleteUser = async ( req, res ) =>
{
      const { id } = req.params
      if ( !id ) return res.sendStatus( 400 ).json( { "message": "User id required" } )
      const user = await User.findOne( { _id: id } ).exec()
      if ( !user ) return res.sendStatus( 400 ).json( { "message": "User not found" } )
      user.deleteOne()
      res.sendStatus( 200 ).json( { 'message': 'account deleted' } )
      console.log(`user with id:${id} was deleted`)
}



module.exports = {
      home,
      getUser,
      deleteUser
};