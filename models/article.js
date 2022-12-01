const mongoose = require('mongoose');
const { Schema } = mongoose

const articleSchema = new Schema({
  title: String,
  category: String,
  content: String,
  writter : {
    type: mongoose.ObjectId,
    ref: "user"
  },
},{ timestamps: true })

const Article = mongoose.model("article", articleSchema)

module.exports = Article