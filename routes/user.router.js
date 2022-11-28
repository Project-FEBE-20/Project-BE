const express = require("express");
const router = express.Router();

const {
    register,
    login
} = require("../controllers/user.controller");
const { registerValidation, loginValidation } = require("../middlewares/validation");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;