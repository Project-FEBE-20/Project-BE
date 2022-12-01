const mongoose = require('mongoose');
const { Schema } = mongoose

const articleSchema = new Schema({
  title: String,
  category: String,
  content: String,
  date: String,
  writter : {
    type: mongoose.ObjectId,
    ref: "User"
  },
})

const Article = mongoose.model("article", articleSchema)

module.exports = Article