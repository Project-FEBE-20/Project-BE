const router = require("express").Router();

const {
	registerValidation,
	loginValidation,
} = require("../middlewares/validation");

const verifyToken = require("../middlewares/user.auth");

const {
	register,
	login,
	getProfile,
	updateProfile,
} = require("../controllers/user.controller");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

module.exports = router;
