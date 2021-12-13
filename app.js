//express - node framework, fs - node module folders work
const express = require("express");
const config = require('./app/config/server.config')

const app = express(),
      server = require('http').createServer(app)
      io = require('socket.io')(server);


// parse x-www-form-urlencoded and json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route 
app.get('/', function(request, response){
    response.sendFile(__dirname + '/html/index.html');
});

//documentaion
app.get('/doc', function(request, response) {
    response.sendFile(__dirname + '/out/index.html')
})
app.get('/global.html', function(request, response) {
    response.sendFile(__dirname + '/out/global.html')
})

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


require('./app/routes/user.routes')(app)
require('./app/routes/device.routes')(app)
require('./app/routes/admin.routes')(app)
require('./app/mqtt/index')

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  });


server.listen(config.host, config.startFuncion);