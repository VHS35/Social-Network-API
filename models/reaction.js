//schema only 
//working on correcting the reaction portion as it is not working correctly
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema (
    {
        //use Mongooses ObjectId data type
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.Objectid()
        },
  
        reactionBody:{
            type: String,
            required: true,
            maxLength: 280
        },
         username: {
            type: String,
            required: true,  
        
       },
       createdAt: {
        type: Date,
        //Set default value to the current timestamp
        default: new Date()
       },
    },
    {
        toJSon: {
            getters: true,
        },
        id: false,
    }
);
module.exports = reactionSchema;