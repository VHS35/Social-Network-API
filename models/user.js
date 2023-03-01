const { Schema, model } = require('mongoose');
//validate email
const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
const checkEmail = (email) => {
    return regex.test(email)
}

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      unique: true,
      required:true,
      validate: [checkEmail, 'Please enter valid email'],
      match: [regex, 'Please enter valid email']
    },

    thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
],
    friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    ],
  },
  {
  
    toJSON: {
      virtuals: true,
    },
    id: false
  },
);
//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
