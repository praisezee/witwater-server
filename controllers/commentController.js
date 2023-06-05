const Post = require('../model/Post')
const Comment = require( '../model/Comment' )

const postComment = async ( req, res ) =>
{
      const { postId, senderId, comment } = req.body;
      if ( !postId || !senderId || !comment ) return res.status( 400 );// bad request
      const post = await Post.find( { _id: postId } )
      if(!post) return res.status(400).json({'message': 'post not found'})
      try {
            const newComment = await Comment.create(
                  {postId,senderId,comment}
            )
            res.status(201).json(newComment)
      } catch (err) {
            res.status(500).json(err)
      }
}

const getComment = async ( req, res ) =>
{
      const { id } = req.params;
      if(!id) return res.status(400)
      const comment = await Comment.find( {
            postId : id
      } ).sort({_id:-1}).exec()
      res.json(comment)
};

const deleteComment = async (req,res) =>
{
      const { id } = req.params;
      const comment = await Comment.findOne( { _id: id } ).exec()
      await comment.deleteOne()
      res.status(200).json(comment)
};



module.exports = {
      getComment,
      postComment,
      deleteComment
}