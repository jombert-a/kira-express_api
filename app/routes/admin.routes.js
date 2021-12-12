module.exports = function (app) {
    var admin = require('../controllers/admin.controller.js')

    app.get('/api/admin/read/devices', admin.readDevices)
}