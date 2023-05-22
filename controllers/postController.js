const Post = require( '../model/Post' )
const Comment = require('../model/Comment')

const getPost = async ( req, res ) =>
{
      const post = await Post.find().sort({_id:-1});
      if ( !post ) return res.sendStatus( 204 ).json( { 'message': 'no posts' } )
      res.json(post)
}

const createPost = async ( req, res ) =>
{
      const { title, post, id } = req.body;
      if ( !title || !post ) return res.sendStatus( 400 ).json({'message': 'all feilds are required'});
      try {
            const result = await Post.create( {
                  "title": title,
                  "post": post,
                  "senderId": id
      });

      res.status(201).json(result)
      } catch (error) {
            console.error(error)
      }
      
};

const editPost = async ( req, res ) =>
{
      const { title, post, id} = req.body;
      if ( !post || !title ) return res.sendStatus( 400 );
      const foundPost = await Post.findOne({_id : id}).exec()
      if ( !foundPost ) return res.sendStatus( 404 ).json( { 'message': `post with id ${ id } not found` } )
      foundPost.title = title
      foundPost.post = post
      const result = await foundPost.save()
      res.json(result)
}

const deletePost = async ( req, res ) =>
{
      const {id} = req.params;
      const foundPost = await Post.findOne({_id : id}).exec()
      if ( !foundPost ) return res.status( 400 ).json( { 'message': `post with id ${ id } not found` } );
      await Comment.deleteMany( { postId: id } );
      await foundPost.deleteOne( { _id: id } )
      res.json( {'message': 'post deleted'})
}

const getSinglePost = async ( req, res ) =>
{
      const {id} = req.params;
      const post = await Post.find({_id : id}).exec()
      if ( !post ) return res.sendStatus( 400 ).json( { 'message': `post with id ${ id } not found` } )
      res.json(post)
}






module.exports = {createPost, editPost, deletePost, getSinglePost, getPost}
