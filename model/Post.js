const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const postSchema = new Schema( {
      senderId: {
            type: String,
            require: true
      },
      title: {
            type: String,
            required: true
      },
      post: {
            type: String,
            required: true
      },
      comment: Array
} );

module.exports = mongoose.model('Post', postSchema)