const mongoose = require('mongoose');
const Comment = require('./commentModel')

const postSchema = new mongoose.Schema({
    image: {
        images: [String], //An array of type strings
    },
    caption: {
        type: String,
        maxlength: [256, 'Caption cannot be longer than 256 characters'],
        required: [true, 'Please add a caption']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Comment must belong to a user']
    },
    comments: {
        type: Number,
        default: 0,
        min: [0, 'Comments cannot be negative']
    },
    likes: {
        type: Number,
        default: 0,
        min: [0, 'Likes cannot be negative']
    },
    dateCreated: {
        type: Date,
        default: Date.now()  
    }
})

postSchema.pre(/^find/, function(next) {    
    this.populate({
        path: 'user',
        select: 'firstName lastName photo'
    })    
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;