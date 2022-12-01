const mongoose = require('mongoose');

const DB_URL="mongodb://mongo:nc1S7A5GX7LiFWNcJuva@containers-us-west-94.railway.app:7485"
const db = mongoose.connect(DB_URL)

module.exports = db;
