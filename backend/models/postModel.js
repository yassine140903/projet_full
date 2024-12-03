const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  images: [
    {
      type: String,
    },
  ], // array of image URLs
  category: {
    type: String,
  }, // e.g., 'Men', 'Women', 'Kids'
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the user who created this post"],
  },
  location: {
    type: String,
  }, // optional field for location-based filtering
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
