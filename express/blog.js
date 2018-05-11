var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = {
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
}

module.exports = new mongoose.Schema(blogSchema);
module.exports.blogSchema = blogSchema;