const db = require("../models");
const User = db.User;

exports.findAll = function (req, res) {
    User.find()
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

exports.createUser = function (req, res) {
    if (!req.body.email && !req.body.password) {
        res.status(400).send({message: "empty content"})
        return;
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save(user)
        .then(data => {
            res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
                message: err.message || 'some error'
            })
        })
}