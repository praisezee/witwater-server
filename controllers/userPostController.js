const Post = require('../model/Post')

const getSinglePostOfUser = async ( req, res ) =>
{
      const id = req.params.id;
      const post = await Post.find( { senderId: id } )
      if ( !post ) return res.sendStatus( 204 ).json( { 'message': `post with id ${ id } not found` } )
      res.json(post)
};


module.exports = {getSinglePostOfUser}