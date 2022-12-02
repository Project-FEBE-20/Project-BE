const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	nama: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true, min:6},
	phone: { type: String, required: true },
	role : {type:String, enum:["dokter", "user"]}
});

const User = mongoose.model("user", userSchema);

module.exports = User;
