module.exports = function(app) {
    var device = require('../controllers/device.controller.js')
    const authMiddleware = require('../middleware/authMiddleware')

    app.get('/api/device', device.findAll)

    app.get('/api/device/list', authMiddleware, device.getList)

    app.post('/api/device/led', device.toggleLed)

    app.post('/api/device/uuid', authMiddleware, device.uuid)

    app.post('/api/device/register', authMiddleware, device.register)
}