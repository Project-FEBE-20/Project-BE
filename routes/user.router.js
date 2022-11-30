const router = require("express").Router();

const {
	registerValidation,
	loginValidation,
} = require("../middlewares/validation");

const verifyToken = require("../middlewares/user.auth");
const verifyUser = require("../middlewares/verifyuser");

const {
	register,
	login,
	getProfile,
	updateProfile,
	getUser,
} = require("../controllers/user.controller");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

router.get("/:id", verifyToken, verifyUser, getUser);

module.exports = router;
