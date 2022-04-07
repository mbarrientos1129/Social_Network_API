const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        thoughtText: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        toJSON: {
            getters: true,
        },
    }
);

// Initialize our User model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
