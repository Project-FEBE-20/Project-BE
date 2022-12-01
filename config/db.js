const mongoose = require('mongoose');
require('dotenv').config();

<<<<<<< HEAD
const db = mongoose.connect(DB_URL)

module.exports = db
=======

module.exports = mongoose.connect(process.env.DB_URL);
>>>>>>> dev
