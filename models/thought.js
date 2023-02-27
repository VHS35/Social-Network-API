const { Schema, model } = require('mongoose');
const reaction = require('./reaction');
const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
      createdAt: {
        type: Date,
        default: new Date ()
      },

      username: {
        type: String,
        required: true
      }  ,
//Array of nested documents created with the reactionSchema
      reactions: [reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length 
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;