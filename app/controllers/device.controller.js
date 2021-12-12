const db = require("../models");
const Device = db.Device;

exports.findAll = function (req, res) {
    Device.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some errors"
            })
        })
}

exports.regDevice = function (req, res) {
    if (!req.body.email && !req.body.serial) {
        res.status(400).send({message: "empty content"})
        return;
    }

    const user = db.User.findOne({ email: req.body.email })
        .then(data => {
            const device = new Device({
                serial: req.body.serial,
                user: data._id
            })

            console.log(device, data);

            // device.save(device)
            //     .then(data => {
            //         res.send(data)
            //     }) 
            //     .catch(err => {
            //         res.status(500).send({
            //             message: err.message || 'some error'
            //         })
            //     })
        })
}