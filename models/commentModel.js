const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    image: {
        images: [String], //An array of type strings
    },
    comment: {
        type: String,
        maxlength: [256, 'Comment cannot be longer than 256 characters'],
        required: [true, 'Please add a comment']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Comment must belong to a user']
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, 'Comment must belong to a post']
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

commentSchema.pre(/^find/, function(next) {    
    this.populate({
        path: 'user',
        select: 'firstName lastName photo'
    })
    next()
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;