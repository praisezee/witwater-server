const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const commentSchema = new Schema( {
      postId: {
            type: String,
            required: true
      },
      senderId: {
            type: String,
            require: true
      },
      comment: {
            type: String,
            required: true
      }
} );

module.exports = mongoose.model('Comment', commentSchema)