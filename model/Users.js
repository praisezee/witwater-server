const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const userSchema = new Schema( {
      fullname: {
            type: String,
            required: true
      },
      gender: {
            type: String,
            required: true
      },
      role: {
            type: String,
            required: true
      },
      state: {
            type: String,
            required: true
      },
      city: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
      },
      phoneNumber: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      refreshToken: [String],
      src: String
} );

module.exports = mongoose.model('User', userSchema)