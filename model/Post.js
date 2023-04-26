const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const postSchema = new Schema( {
      fullname: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
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