const User = require("../models/user");

module.exports = async (req, res, next) => {
	const _id = req.user;

	try {
		const user = await User.findOne({ _id });

		if (user.role==false)
			return res
				.status(403)
				.send({ status: res.statusCode, message: "user tidak memiliki akses" });

		next();
	} catch (error) {
		res.status(500).send({ status: res.statusCode, message: error.message });
	}
};