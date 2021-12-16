module.exports = function(app) {
    const user = require('../controllers/user.controller.js')
    const authMiddleware = require('../middleware/authMiddleware')

    app.post("/api/login", user.login)
    app.post("/api/user/registration", user.registration)

    app.get("/api/user", authMiddleware, user.getUser)
}