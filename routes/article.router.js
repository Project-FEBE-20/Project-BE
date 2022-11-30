const express = require("express");
const router = express.Router();

const {
  getAllArticle,
  getArticleByID,
  addArticle,
  deleteArticleByID, 
  updateArticleByID
} = require("../controllers/article.controller");
// const articleAddAuth = require("../middlewares/add.article.auth");
// const articleAuth = require("../middlewares/article.auth");

router.get("/", getAllArticle);
router.get("/:id", getArticleByID);  
router.post("/add", addArticle);
router.delete("/:id", deleteArticleByID);
router.patch("/:id", updateArticleByID);

module.exports = router;