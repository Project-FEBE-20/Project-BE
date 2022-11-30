const express = require("express");
const router = express.Router();

const {
  getAllArticle,
  getArticleByID,
  addArticle,
  deleteArticleByID, 
  updateArticleByID
} = require("../controllers/article.controller");

const verifyToken = require("../middlewares/user.auth");
const verifyUser = require("../middlewares/verifyuser");

router.get("/", verifyToken, getAllArticle);
router.get("/:id", verifyToken, getArticleByID);  
router.post("/add", verifyToken, verifyUser, addArticle);
router.delete("/:id", verifyToken, verifyUser, deleteArticleByID);
router.patch("/:id", verifyToken, verifyUser, updateArticleByID);

module.exports = router;