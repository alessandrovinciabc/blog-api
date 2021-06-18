const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, maxLength: 60, required: true },
    html: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
