const mqttConfig = require("../config/mqtt.config.js");

var mqtt = require('mqtt'); //https://www.npmjs.com/package/mqtt

var client = mqtt.connect(mqttConfig);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    //Called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('#');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');

module.exports = client