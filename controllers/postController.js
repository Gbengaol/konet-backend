const Post = require("../models/postModel")
const Comment = require("../models/commentModel")
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.createPost = catchAsync(async (req, res, next) => {
    let requestBody = {
        ...req.body,
        user: req.user._id
    }
    const doc = await Post.create(requestBody);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
})
exports.getAllPosts = factory.getAll(Post)
exports.getPost = catchAsync(async (req, res, next) => {
  const doc = await Comment.find({post: req.params.id})

  res.status(201).json({
    status: 'success',
    data: {
      comments: doc.length,
      data: doc
    }
  });
})
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.likePost = catchAsync(async (req, res, next) => {
    const doc = await Post.findByIdAndUpdate( req.params.id, { $inc: {likes: 1}}, {
        new: true,
        runValidators: true
      });

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
})

exports.unlikePost = catchAsync(async (req, res, next) => {
    const doc = await Post.findByIdAndUpdate( req.params.id, { $inc: {likes: -1}}, {
        new: true,
        runValidators: true
      });

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
})