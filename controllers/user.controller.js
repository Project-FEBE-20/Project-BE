require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
	register: async (req, res) => {
		if (req.validateError) {
			const err = req.validateError.details[0].message;
			return res
				.status(400)
				.send({ status: "fail", message: err.replace(/"/g, "") });
		}

		const { nama, email, password, phone, isAdmin = false } = req.body;

		const emailExist = await User.findOne({ email });
		if (emailExist)
			return res
				.status(400)
				.send({ status: "fail", message: "Email sudah digunakan" });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = new User({
			nama,
			email,
			password: hashPassword,
			phone,
			isAdmin,
		});

		try {
			await user.save();
			res
				.status(201)
				.send({ status: "success", message: "akun berhasil dibuat" });
		} catch (error) {
			res.status(500).send({ status: "fail", message: error.message });
		}
	},

	login: async (req, res) => {
		if (req.validateError) {
			const err = req.validateError.details[0].message;
			return res
				.status(400)
				.send({ status: "fail", message: err.replace(/"/g, "") });
		}

		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(404)
				.send({ status: "fail", message: "user tidak ditemukan" });

		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass)
			return res
				.status(400)
				.send({ status: "fail", message: "password yang dimasukkan salah!" });

		const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
		res.send({
			status: "success",
			message: "user berhasil login",
			accessToken: token,
		});
	},

	getProfile: async (req, res) => {
		const _id = req.user;

		try {
			const user = await User.findOne({ _id }, "-password -isAdmin");

			res.send({ status: "success", message: "user ditemukan", data: user });
		} catch (error) {
			res.status(500).send({ status: "fail", message: error.message });
		}
	},

	updateProfile: async (req, res) => {
		const _id = req.user;

		try {
			const oldUser = await User.findOne({ _id });

			let hashPassword;
			if (req.body.password) {
				const salt = await bcrypt.genSalt(10);
				hashPassword = await bcrypt.hash(req.body.password, salt);
			}

			const data = {
				nama: req.body.nama || oldUser.nama,
				email: req.body.email || oldUser.email,
				password: hashPassword || oldUser.password,
				umur: req.body.umur || oldUser.umur,
			};

			const user = await User.findOneAndUpdate({ _id }, { ...data });
			res.send({
				status: "success",
				message: "profil berhasil diperbarui",
			});
		} catch (error) {
			res.status(500).send({ status: "fail", message: error.message });
		}
	},

	getUser: async (req, res) => {
		const { id } = req.params;
		try {
			const user = await User.findOne({ _id: id }, "-password");

			if (!user)
				return res
					.status(404)
					.send({ status: "fail", message: "user tidak ditemukan" });

			res.send({
				status: "success",
				message: "user berhasil ditemukan",
				data: user,
			});
		} catch (error) {
			res.status(500).send({ status: "fail", message: error.message });
		}
	},

}
