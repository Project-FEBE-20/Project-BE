const express = require('express');
const app = express()
var cors = require('cors')

const db = require('./config/db');
const allRoutes = require('./routes');

const PORT = process.env.PORT || 3500

db.
    then(() => {
        console.log("Database Connected!")
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.json())
app.use(allRoutes)
app.use(cors())

app.listen(PORT, () => {
    console.log("Server Running on Port " + PORT);
})