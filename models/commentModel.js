const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const CommentSchema = new Schema(
  {
    postId: { type: ObjectId, ref: 'Post' },
    owner: { type: String, maxLength: 20, required: true },
    text: { type: String, maxLength: 255, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
