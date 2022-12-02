const express = require('express');
const router = express.Router()

const userRouter = require('./user.router');
const articleRouter = require('./article.router');

router.use("/user" ,userRouter)
router.use("/article" ,articleRouter)

module.exports = router