//express - node framework
const express = require("express");
const config = require('./app/config/server.config');
const cors = require('cors');

const app = express(),
    server = require('http').createServer(app);

//socket
io = require('socket.io')(server);

// parse x-www-form-urlencoded and json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//staic
app.use(express.static('public'));
app.use(express.static('out'));

//cors
const corsOptions = {
    origin: config.site_url,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// simple route 
app.get('/simple', function(request, response) {
    response.sendFile(__dirname + '/html/index.html');
});

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