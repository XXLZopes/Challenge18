const { Schema, model, Types } = require('mongoose');

const ReactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {
        getters: true,
    },
    id: false
}
);

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: 'Your username is required.'
    },
    reactions: [ReactionsSchema]
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports =  { Thoughts };