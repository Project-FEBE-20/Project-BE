const express = require("express");
const router = express.Router();

const {
    doctorRegister,
    doctorLogin,
    getAllDoctor,
    getDoctorByID,
    deleteDoctorByID,
    updateDoctorByID,
} = require("../controllers/doctor.controller");
const { registerValidation, loginValidation } = require("../middlewares/validation");
const doctorAuth = require("../middlewares/doctor.auth") 

router.post("/register", registerValidation, doctorRegister);
router.post("/login", loginValidation, doctorLogin);
router.get("/", getAllDoctor);
router.get("/:id", getDoctorByID);
router.delete("/:id", doctorAuth, deleteDoctorByID);
router.patch("/:id", doctorAuth, updateDoctorByID);

module.exports = router;