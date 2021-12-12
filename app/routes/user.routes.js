module.exports = function (app) {
    var user = require('../controllers/user.controller.js')

    app.get("/api/user", user.findAll)

    app.post("/api/user", user.createUser)
}