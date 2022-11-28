const express = require("express");
const router = express.Router();

const {
    userRegister,
    userLogin,
    getAllUser,
    getUserByID,
    deleteUserByID,
    updateUserByID,
} = require("../controllers/user.controller");
const { registerValidation, loginValidation } = require("../middlewares/validation");
const verifyToken=require("../middlewares/user.auth")

router.post("/register", registerValidation, userRegister);
router.post("/login", loginValidation, userLogin);
router.get("/", getAllUser);
router.get("/:id", getUserByID);
router.delete("/:id", verifyToken, deleteUserByID);
router.patch("/:id", verifyToken, updateUserByID);

module.exports = router;