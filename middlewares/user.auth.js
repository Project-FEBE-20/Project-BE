require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
	try {
		if (!req.headers.authorization)
			return res
				.status(403)
				.send({ status: res.statusCode, message: "user tidak memiliki akses" });

		const token =
			req.headers.authorization.split(" ")[1] || req.headers.authorization;

		if (!token)
			return res
				.status(403)
				.send({  status: res.statusCode, message: "user tidak memiliki akses" });
		const verified = jwt.verify(token, process.env.SECRET_KEY);

		if (!verified)
			return res.status(401).send({ status: "fail", msg: "token tidak valid" });

		if (!verified._id)
			return res.status(401).send({ status: "fail", msg: "token tidak valid" });





			// if (!verified) {
			// 	return res.status(401).send({
			// 		message: "token tidak valid",
			// 	});
			// } else if (!verified._id) {
			// 	return res.status(403).json({
			// 		status: res.statusCode,
			// 		message: "token tidak valid"
			// 	});
			// }

		const user = await User.findOne({ _id: verified._id }, "-password");

		if (!user)
			return res
				.status(404)
				.send({  message: "user tidak ditemukan" });

		req.user = verified._id;
		next();
	} catch (error) {
		res.status(500).send({ status: res.statusCode, message: error.message });
	}
};