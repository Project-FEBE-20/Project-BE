require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('user-token')
    if (!token) return res.status(400).json({
        status: res.statusCode,
        message: "Access Denied!"
    })

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        if (!verified) {
            res.status(401).send({
                message: "Unauthorized!",
            });
        } else if (verified.user._id != req.params.id) {
            return res.status(403).json({
                status: res.statusCode,
                message: "Access Denied!"
            });
        }
        next()
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: "Invalid Token!"
        });
    }
}
module.exports = verifyToken