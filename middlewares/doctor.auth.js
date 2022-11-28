require('dotenv').config();
const jwt = require('jsonwebtoken');

const doctorAuth = (req, res, next) => {
    const token = req.header('doctor-token')
    if (!token)
        return res.status(403).json({
            status: res.statusCode,
            message: "Access Denied!"
        });
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verified.doctor._id);
        if (!verified) {
            res.status(401).send({
                message: "Unauthorized!",
            });
        } else if (verified.doctor._id != req.params.id) {
            return res.status(403).json({
                status: res.statusCode,
                message: "Access Denied!"
            }); //Checks doctor's id currently logged in is the same as req.params.id
        }
        next()
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: "Invalid Token!"
        });
    }
}


module.exports = doctorAuth
