const Joi = require("joi");

exports.registerValidation = (req, res, next) => {
	const { nama, email, password, phone } = req.body;
	const schema = Joi.object({
		nama: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6),
		phone: Joi.string().required(),
	});

	req.validateError = schema.validate({ nama, email, password, phone}).error;
	next();
};

exports.loginValidation = (req, res, next) => {
	const { email, password } = req.body;
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().min(6).required(),
	});

	req.validateError = schema.validate({ email, password }).error;
	next();
};