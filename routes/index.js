const express = require('express');
const router = express.Router()

const userRouter = require('./user.router');
const doctorRouter = require('./doctor.router');
const articleRouter = require('./article.router');

router.use("/user" ,userRouter)
router.use("/doctor" ,doctorRouter)
router.use("/article" ,articleRouter)

module.exports = router