const express = require('express');
const app = express()
const db = require('./config/db');

const allRoutes = require('./routes');

require('dotenv').config();
const PORT = process.env.PORT 

db.
    then(() => {
        console.log("Database Connected!")
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.json())
app.use(allRoutes)

app.listen(PORT, () => {
    console.log("Server Running on Port " + PORT);
})