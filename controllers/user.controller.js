require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user');


module.exports = {
	register: async (req, res) => {
		if (req.validateError) {
			const err = req.validateError.details[0].message;
			return res
				.status(400)
				.send({ message: err });
		}

		const data = req.body;

		const emailExist = await User.findOne({ email: data.email });
		if (emailExist)
			return res
				.status(400)
				.send({
					status: "failed",
					message: "Email sudah digunakan"
				});

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(data.password, salt);
		data.password = hashPassword

		const user = new User(data);

		try {
			await user.save();
			res
				.status(201)
				.send({
					status: "success",
					message: "akun berhasil dibuat"
				});
		} catch (error) {
			res.status(500).send({
				status: "failed",
				message: error.message
			});
		}
	},

	login: async (req, res) => {
		if (req.validateError) {
			const err = req.validateError.details[0].message;
			return res
				.status(400)
				.send({ status: "failed", message: err.message });
		}

		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(404)
				.send({ status: "failed", message: "user tidak ditemukan" });

		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass)
			return res
				.status(400)
				.send({
					status: "failed",
					message: "password yang dimasukkan salah!"
				});

		const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
		res.send({
			status: "success",
			message: "user berhasil login",
			accessToken: token,
		});
	},
}