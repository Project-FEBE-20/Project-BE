const express = require('express');
const router = express.Router()

const userRouter = require('./user.router');
const doctorRouter=require('./doctor.router');

router.use("/user" ,userRouter)
router.use("/doctor" ,doctorRouter)

module.exports = router