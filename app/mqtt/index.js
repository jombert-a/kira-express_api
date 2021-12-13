const mqttConfig = require("../config/mqtt.config.js");

var mqtt = require('mqtt'); //https://www.npmjs.com/package/mqtt

var client = mqtt.connect(mqttConfig);

const bs = (bool) => bool ? '1' : '0'

//setup the callbacks
client.on('connect', function () {
    console.log('Connected to the mqtt broker!');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', async function (topic, message) {
    //Called each time a message is received
    // console.log(`topic: ${topic}; message: ${message.toString}`
    try {
        const parsedTopic = topic.split('/')
        const uuid = parsedTopic[0]
        const command = parsedTopic[1]
        console.log(`uuid: ${uuid}; command: ${command}; message: ${message.toString()}`)

        if (command === "reconnect") {
            let value = true
            for(let i = 0; i < 100; i++) {
                client.publish(`${uuid}/led`, bs(value))
                value = !value
            }
        }
    
    } catch (err) {
        console.log(err)
    }
    
});

// subscribe to topic 'my/test/topic'
client.subscribe('#');

// publish message 'Hello' to topic 'my/test/topic'
// client.publish('led', '0');

module.exports = client