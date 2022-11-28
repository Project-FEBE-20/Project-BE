require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user');


module.exports = {
	userRegister: async (req, res) => {
		if (req.validateError) {
			const err = req.validateError.details[0].message;
			return res
				.status(400)
				.send({ message: err.replace(/"/g, "") });
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
				message: error.message
			});
		}
	},

	userLogin: async (req, res) => {
		if (req.validateError) {
			const err = req.validateError.details[0].message;
			return res
				.status(400)
				.send({ message: err.replace(/"/g, "") });
		}

		const data = req.body;

		const user = await User.findOne({ email: data.email });
		if (!user)
			return res
				.status(404)
				.send({ message: "user tidak ditemukan" });

		const checkPass = await bcrypt.compare(data.password, user.password);
		if (!checkPass)
			return res
				.status(400)
				.send({
					message: "password yang dimasukkan salah!"
				});

		const id = user._id;
		const token = jwt.sign({ user }, process.env.SECRET_KEY);
		res.header('user-token', token).status(200).json({
			message: "sukses login!",
			token,
			id
		})
	},

	getAllUser: async (req, res) => {
		try {
			const user = await User.find({}, "-__v")

			res.status(200).json({
				message: "Berhasil ambil data user",
				data: user
			})
		} catch (error) {
			res.status(500).json({ message: "Server Error" })
		}
	},

	getUserByID: async (req, res) => {
		try {
			const user = await User.findById(req.params.id, "-__v")

			if (!user) {
				res.status(404).json({
					message: "Data tidak ditemukan"
				});
			} else {
				res.status(200).json({
					message: "Data yang dicari",
					data: user
				})
			}
		} catch (error) {
			res.status(500).json({ message: "Server Error" })
		}
	},

	deleteUserByID: async (req, res) => {
		try {
			const user = await User.findById(req.params.id, "-__v")

			if (!user) {
				res.status(404).json({
					message: "data tidak ditemukan"
				});
			} else {
				user.deleteOne()
				res.status(201).json(
					{
						message: "Data berhasil dihapus"
					})
			}
		} catch (error) {
			res.status(500).json({ message: "Server Error" })
		}
	},

	updateUserByID: async (req, res) => {
		try {
			const user = await User.findById(req.params.id, "-__v")
			const data = req.body

			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(data.password, salt);
			data.password = hashPassword


			Object.assign(user, req.body)
			await user.save();
			res.status(201).send({
				message: "Update user",
				data: user
			})
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
}