const db = require("../models");
const User = db.User;
const Role = db.Role;

const validator = require("../validator")
const bcrypt = require("bcryptjs")

const { secret_key } = require("../config/server.config")
const jwt = require("jsonwebtoken")

const generateAccessToken = (id, roles) => jwt.sign({ id, roles }, secret_key, { expiresIn: "24h" })

/** @module User **/

exports.findAll = function(req, res) {
    User.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some errors"
            })
        })
}

/**
 * @memberof User
 * @param {string} email - email of user 
 * @param {string} password - password of user 
 * @throws 1 - email is empty
 * @throws 2 - password is empty
 * @throws 3 - email is not valid
 * @throws 4 - password is not valid
 * @throws 5 - email is already registered
 */
exports.registration = async function(req, res) {
    try {
        const { email, password } = req.body

        //validation
        if (!email) throw 1
        if (!password) throw 2

        if (!validator.email(email)) throw 3
        if (!validator.password(password)) throw 4

        const condidate = await User.findOne({ email })
        if (condidate) throw 5

        //registration
        const hashPassword = bcrypt.hashSync(password, 7)
        const role = await Role.findOne({ value: "USER" })
        const user = new User({ email, password: hashPassword, roles: [role.value] })

        await user.save(user)
        res.status(200).send()

    } catch (e) {
        res.status(400).send({ code: e })
    }
}

/**
 * @memberof User
 * @param {string} email - email of user 
 * @param {string} password - password of user 
 * @throws 1 - email is empty
 * @throws 2 - password is empty
 * @throws 3 - email is not valid
 * @throws 4 - password is not valid
 */
exports.login = async function(req, res) {
    try {
        const { email, password } = req.body
            //validation
        if (!email) throw 1
        if (!password) throw 2
        const condidate = await User.findOne({ email })
        if (!condidate) throw 3
        const validPassword = bcrypt.compareSync(password, condidate.password)
        if (!validPassword) throw 4
        const token = generateAccessToken(condidate._id, condidate.roles)
        res.send(token)
    } catch (e) {
        res.status(400).send({ code: e })
    }
}

/**
 * @memberof User
 * @param {string} token -Bearer {{token}}
 * @throws 0 - not auth
 * @throws 1 - user not found
 */
exports.getUser = async function(req, res) {
    try {
        if (!req.user.id) throw 0
        const user = await User.findOne({ _id: req.user.id }).select('email _id')
        if (!user) throw 0
        res.send(user)
    } catch (e) {
        res.status(400).send({ code: e })
    }
}