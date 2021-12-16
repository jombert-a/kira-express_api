const jwt = require('jsonwebtoken');
const { secret_key } = require('../config/server.config')

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) throw new Error

        const decodedData = jwt.verify(token, secret_key)
        req.user = decodedData
        next()
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Not auth' })
    }
}