const Comment = require("../models/commentModel")
const Post = require("../models/postModel")
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.createComment = catchAsync(async (req, res, next) => {
    let requestBody = {
        ...req.body,
        user: req.user._id
    }
    const doc = await Comment.create(requestBody);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
})
exports.getAllComments = factory.getAll(Comment)
exports.getComment = factory.getOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);