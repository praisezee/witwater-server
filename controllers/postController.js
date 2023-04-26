const Post = require('../model/Post')

const getPost = async ( req, res ) =>
{
      const post = await Post.find();
      if ( !post ) return res.sendStatus( 204 ).json( { 'message': 'no posts' } )
      res.json(post)
}

const createPost = async ( req, res ) =>
{
      const { title, post, name, email } = req.body;
      if ( !title || !post ) return res.sendStatus( 400 ).json({'message': 'all feilds are required'});
      try {
            const result = await Post.create({
            "title": title,
            "post": post,
            "name": name,
            "email": email,
            "comment": []
      });


      res.sendStatus(201).json(result)
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
      const {id} = req.body;
      const foundPost = await Post.findOne({_id : id}).exec()
      if ( !foundPost ) return res.sendStatus( 400 ).json( { 'message': `post with id ${ id } not found` } )
      const result = await foundPost.deleteOne({_id : id})
      res.json(result)
}

const getSinglePost = async ( req, res ) =>
{
      const id = req.params.id;
      const post = await Post.findOne({_id : id}).exec()
      if ( !post ) return res.sendStatus( 404 ).json( { 'message': `post with id ${ id } not found` } )

      res.json(post)
}


const postComment = async ( req, res ) =>
{
      const {comment , name, email} = req.body
      const id = req.params.id;
      const post = await Post.findOne({_id : id}).exec()
      if ( !post ) return res.sendStatus( 404 ).json( { 'message': `post with id ${ id } not found` } )

      const comments = {
            "name": name,
            "email": email,
            "comment": comment
      }

      if ( !comments.comment ) res.sendStatus( 400 ).json( { 'message': " enter your comment" } )
      post.comment = comments
      const result = await post.save()
      res.json(result)

}

module.exports = {createPost, editPost, deletePost, getSinglePost, getPost, postComment}
