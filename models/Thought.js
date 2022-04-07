const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction")
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],

        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that gets and sets the user's full name
userSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
