const mongoose = require("mongoose");
const HttpError = require("../../../models/http-error");
const Blog = require("../../../models/blog");

const deleteComment = async (req, res, next) => {
  const blogId = req.params.bid;
  const commentId = req.params.cid;

  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    const error = new HttpError(
      "There was an error with the request to delete the comment.",
      500
    );
    return next(error);
  }

  if (!blog) {
    const error = new HttpError(
      "There was an error finding a blog by the given Id.",
      404
    );
    return next(error);
  }

  const commentIndex = blog.comments.findIndex(
    (c) => c._id.toString() === commentId
  );

  if (commentIndex === -1) {
    const error = new HttpError(
      "There was an error finding the comment by the given Id.",
      404
    );
    return next(error);
  }

  if (blog.comments[commentIndex].userId.toString() !== req.userData.userId) {
    const error = new HttpError(
      "You are not authorized to delete this comment.",
      401
    );
    return next(error);
  }

  let sess;

  try {
    sess = await mongoose.startSession();
    sess.startTransaction();
    blog.comments.pull({ _id: commentId });
    await blog.save({ session: sess });
    await sess.commitTransaction();
    await blog.populate("comments");
  } catch (err) {
    const error = new HttpError(
      "There was an error with the request to confirm deletion.",
      500
    );
    return next(error);
  } finally {
    if (sess) {
      sess.endSession();
    }
  }

  res.status(200).json({ blogComments: blog.comments, ok: true });
};

module.exports = deleteComment;
