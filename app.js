//express - node framework, fs - node module folders work
const express = require("express");
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();

const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(dbUrl);

// db functions 
async function addUser(user) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("kiradb");
        const collection = db.collection("users");
        const result = await collection.insertOne(user);
        console.log(result);
        console.log(user);
    } catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}

async function getUsers() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("kiradb")
        const collection = db.collection("users")
        const results = await collection.find().toArray();
        return results;
    } catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}


//rest api
app.use(express.static(__dirname + "/public"));
  
//получение списка пользователей
app.get("/api/users", async function(req, res){
    const users = await getUsers()
    res.send(users)
});

// получение отправленных данных
app.post("/api/users", jsonParser, function (req, res) {
    console.log(req.body);
      
    if(!req.body || !req.body.email || !req.body.password) return res.sendStatus(400);
    
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    let user = {email: userEmail, password: userPassword};
    addUser(user)
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});