const Joi = require('joi');
const usersModels = require("../models/users.models")

const logout = (req, res) => {
    let session_token = req.get('X-Authorization');
    usersModels.removeToken(session_token, (err) => {
        if (err) return res.sendStatus(500)
        return res.status(200).send("You have been logged out now!")
    })
}
//double check this
const login = (req, res) => {
  const schema = Joi.object({
        "email": Joi.string().email().required(),
        "password": Joi.string().required()
    })
    const {
        error
    } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message) 
    usersModels.authenticateUser(req.body.email, req.body.password, (err, id) => {
        if (err === 404) return res.status(400).send("Invalid email/password supplied")
        if (err) return res.sendStatus(500)
        usersModels.getToken(id, (err, token) => {

            if (err) return res.sendStatus(500)
            if (token) {
                return res.status(200).send({
                    user_id: id,
                    session_token: token
                })
            } else {
                usersModels.setToken(id, (err, token) => {
                    if (err) return res.sendStatus(500)
                    return res.status(200).send({
                        user_id: id,
                        session_token: token
                    })
                })
            }
        })
    })
}
const getAllUsers = (req, res) => {
    usersModels.getAll((err, num_rows, users) => {
        if (err) return res.sendStatus(500);

        return res.status(200).send(users);

    })
}
const getUser = (req, res) => {
    let user_id = parseInt(req.params.user_id);
    usersModels.getUser(user_id,(err, user) => {
        if (err) return res.sendStatus(500);

        return res.status(200).send(user);

    })
}
const addNewUser = (req, res) => {
    const schema = Joi.object({
        "first_name": Joi.string().required(),
        "last_name": Joi.string().required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().regex(RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$")).required()
    })
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = Object.assign({},req.body);
 
    usersModels.addNewUser(user, (err, id) => {
        if (err) return res.sendStatus(500);
        return res.status(201).send({user_id: id})
    })

}
module.exports = {
    addNewUser: addNewUser,
    getAllUsers: getAllUsers,
    login: login,
    logout: logout,
    getUser:getUser
}