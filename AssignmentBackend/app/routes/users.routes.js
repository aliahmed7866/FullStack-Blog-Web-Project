const usersController = require("../controllers/users.controllers")
const auth =require("../lib/authentication")

module.exports = function(app){
    app.route("/login")
    .post(usersController.login);
    app.route("/users")
    .post(auth.isAuthenticated,auth.isValid,usersController.addNewUser)
    .get(auth.isAuthenticated,usersController.getAllUsers); 
    app.route("/users/:user_id")
    .get(usersController.getUser)
    app.route("/logout")
    .post(auth.isAuthenticated,usersController.logout);
}