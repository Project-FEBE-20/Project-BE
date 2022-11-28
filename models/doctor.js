const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
    nama: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true, min:6},
	phone: { type: String, required: true },
})

const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor