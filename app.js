const express = require('express');
const app = express()
const db = require('./config/db');

const PORT = process.env.PORT || 3500

db.
    then(() => {
        console.log("Database Connected!")
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.json())

app.listen(PORT, () => {
    console.log("Server Running on Port " + PORT);
})