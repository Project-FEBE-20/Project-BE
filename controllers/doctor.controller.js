require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/doctor');


module.exports = {
    doctorRegister: async (req, res) => {
        if (req.validateError) {
            const err = req.validateError.details[0].message;
            return res
                .status(400)
                .send({ message: err });
        }

        const data = req.body;

        const emailExist = await Doctor.findOne({ email: data.email });
        if (emailExist)
            return res
                .status(400)
                .send({
                    message: "Email sudah digunakan"
                });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        data.password = hashPassword

        const doctor = new Doctor(data);

        try {
            await doctor.save();
            res
                .status(201)
                .send({
                    message: "akun berhasil dibuat"
                });
        } catch (error) {
            res.status(500).send({
                message: error.message
            });
        }
    },

    doctorLogin: async (req, res) => {
        if (req.validateError) {
            const err = req.validateError.details[0].message;
            return res
                .status(400)
                .send({  message: err.replace(/"/g, "") });
        }

        const data = req.body;

        const doctor = await Doctor.findOne({ email: data.email });
        if (!doctor)
            return res
                .status(404)
                .send({  message: "user tidak ditemukan" });

        const checkPass = await bcrypt.compare(data.password, doctor.password);
        if (!checkPass)
            return res
                .status(400)
                .send({
                    message: "password yang dimasukkan salah!"
                });

        const id = doctor._id;
        const token = jwt.sign({ doctor }, process.env.SECRET_KEY);
        res.header('doctor-token', token).status(200).json({
            message: "sukses login!",
            token,
            id
        })
    },

    getAllDoctor: async (req, res) => {
        try {
            const doctors = await Doctor.find({}, "-__v")

            res.status(200).json({
                message: "Data dokter",
                data: doctors
            })
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    },

    getDoctorByID: async (req, res) => {
        try {
            const doctors = await Doctor.findById(req.params.id, "-__v")

            if (!doctors) {
                res.status(404).json({
                    message: "data tidak ditemukan"
                });
            } else {
                res.status(200).json({
                    message: "data yang dicari",
                    data: doctors
                })
            }
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    },

    deleteDoctorByID: async (req, res) => {
        try {
            const doctors = await Doctor.findById(req.params.id, "-__v")

            if (!doctors) {
                res.status(404).json({
                    message: "data tidak ditemukan"
                });
            } else {
                doctors.deleteOne()
                res.status(201).json(
                    {
                        message: "Data berhasil dihapus"
                    })
            }
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    },

    updateDoctorByID: async (req, res) => {
        try {
            const doctors = await Doctor.findById(req.params.id, "-__v")
            const data = req.body

            const saltRounds = 10
            const hash = bcrypt.hashSync(data.password, saltRounds);
            data.password = hash

            Object.assign(doctors, req.body)
            doctors.save();
            res.status(201).send({
                message: "update profil dokter",
                data: doctors
            })

        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }
}