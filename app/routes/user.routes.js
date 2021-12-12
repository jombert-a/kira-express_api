module.exports = function (app) {
    var user = require('../controllers/user.controller.js')

    app.get("/api/user", user.findAll)

    app.post("/api/login", user.login)
    app.post("/api/user/registration", user.createUser)
}