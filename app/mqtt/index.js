const mqttConfig = require("../config/mqtt.config.js");

var mqtt = require('mqtt'); //https://www.npmjs.com/package/mqtt

var client = mqtt.connect(mqttConfig);

var counter = 0,
    flag = false

const bs = (bool) => bool ? '1' : '0'

//setup the callbacks
client.on('connect', function() {
    console.log('Connected to the mqtt broker!');
});

client.on('error', function(error) {
    console.log(error);
});

client.on('message', async function(topic, message) {
    //Called each time a message is received
    // console.log(`topic: ${topic}; message: ${message.toString}`
    try {
        const parsedTopic = topic.split('/')
        const uuid = parsedTopic[0]
        const command = parsedTopic[1]
        console.log(`uuid: ${uuid}; command: ${command}; message: ${message.toString()}`)
        counter++;

        if (command === "reconnect") {
            const db = require("../models");
            const Device = db.testDevice;
            const testDevice = await Device.findOneAndUpdate({ uuid: "0" }, { $set: { "led": bs(flag) } })
            flag = !flag

            // client.publish(`${uuid}/led`, bs(testDevice.led))
            console.log(testDevice, counter)
        }

    } catch (err) {
        console.log(err)
    }

});

// subscribe to topic 'my/test/topic'
client.subscribe('#');

// publish message 'Hello' to topic 'my/test/topic'
// let testVar = new Array(8050).fill(0).join('').toString()
// client.publish('0/update', '2 http://192.168.0.112:3000/firmware/test.bin');

module.exports = client