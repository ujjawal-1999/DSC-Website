const mongoose = require('mongoose');
const {
  ObjectId
} = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  cover: {
    type: String,
    default: 'https://cdn-images-1.medium.com/max/800/1*fDv4ftmFy4VkJmMR7VQmEA.png'
  },
  appreciateCount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Blog", blogSchema);