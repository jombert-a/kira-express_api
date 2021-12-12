module.exports = function (app) {
    var device = require('../controllers/device.controller.js')

    app.post('/api/device', device.regDevice)

    app.get('/api/device', device.findAll)

    app.post('/api/device/led', device.toggleLed)

}