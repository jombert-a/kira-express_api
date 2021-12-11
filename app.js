//express - node framework, fs - node module folders work
const express = require("express");

const app = express();

// parse x-www-form-urlencoded and json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route 
app.get('/', function(request, response){
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


require('./app/routes/user.routes.js')(app);
require('./app/mqtt/index')

app.listen(3000, function(){
    console.log("Server start!");
});