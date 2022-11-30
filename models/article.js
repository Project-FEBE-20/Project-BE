const mongoose = require('mongoose');
const { Schema } = mongoose

const articleSchema = new Schema({
  title: String,
  category: String,
  content: String,
  date: String,
  writter : {
    type: mongoose.ObjectId,
    ref: "Doctor"
  },
})

const Article = mongoose.model("Article", articleSchema)

module.exports = Article