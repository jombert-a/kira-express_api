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