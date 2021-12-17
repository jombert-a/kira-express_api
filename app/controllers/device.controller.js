const db = require("../models");
const Device = db.Device;

const mqtt = require('../mqtt')
const { v5: uuidv5 } = require('uuid');
const config = require('../config/server.config')
const fs = require('fs');

// var device = new Device({
//     name: 'Test',
//     scheme: {
//         "online": "Boolean",
//         "button": "button",
//         "led": "Boolean",
//         "uuid": "String",
//         "user": {
//             "type": "mongoose.Schema.Types.ObjectId",
//             "ref": "'user'"
//         }
//     }
// })

// device.save(device)
// var TestDevice = db.testDevice
// var testDivice = new TestDevice({
//     led: false,
//     stove: false,
//     uuid: "0"
// })
// testDivice.save(testDivice)

exports.findAll = function(req, res) {
    Device.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some errors"
            })
        })
}

exports.regDevice = function(req, res) {
    if (!req.body.email && !req.body.serial) {
        res.status(400).send({ message: "empty content" })
        return;
    }

    const user = db.User.findOne({ email: req.body.email })
        .then(data => {
            const device = new Device({
                serial: req.body.serial,
                user: data._id
            })

            device.save(device)
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'some error'
                    })
                })
        })
}

exports.toggleLed = function(req, res) {
    if (!req.body.status) {
        res.status(400).send({ message: "empty content or not correct status" })
        return;
    }


    mqtt.publish('led', req.body.status)
    res.send({ status: 200 })
}

exports.uuid = function(req, res) {
    try {
        if (!req.body.name) throw 1
        const uuid = uuidv5(req.body.name, config.uuid_namespace)
        res.status(200).send({ uuid })
    } catch (err) {
        res.status(400).send({ code: err })
    }
}

exports.getList = async function(req, res) {
    try {
        const arr = await Device.find().select('_id name')
        res.send(arr)
    } catch (err) {
        res.status(400).send({ code: err })
    }
}

exports.register = async function(req, res) {
    try {
        if (!req.body.type) throw 1
        const deviceType = await Device.findOne({ name: req.body.type })
        const new_device = db[deviceType.name + "_device"]
        const counter = await new_device.count()
        const uuid = uuidv5(deviceType._id + counter, config.uuid_namespace)

        const newDevice = new new_device({ uuid, device: deviceType._id })
        await newDevice.save(newDevice)
        res.send(newDevice)
    } catch (err) {
        console.log(err)
        res.status(400).send({ code: err })
    }
}