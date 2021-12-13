const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = require("./user.models.js")(mongoose)
db.Device = require("./device.models.js")(mongoose)
db.Role = require("./role.models.js")(mongoose)
db.testDevice = require("./testDevice.models")(mongoose)

module.exports = db