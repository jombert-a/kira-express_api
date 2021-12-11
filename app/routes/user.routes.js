module.exports = function (app) {
    var user = require('../controllers/user.controller.js')

    app.get("/api/users", user.findAll);
    
    // получение отправленных данных
    // app.post("/api/users", jsonParser, function (req, res) {
    //     console.log(req.body);
          
    //     if(!req.body || !req.body.email || !req.body.password) return res.sendStatus(400);
        
    //     const userEmail = req.body.email;
    //     const userPassword = req.body.password;
    //     let user = {email: userEmail, password: userPassword};
    //     addUser(user)
    // });
}