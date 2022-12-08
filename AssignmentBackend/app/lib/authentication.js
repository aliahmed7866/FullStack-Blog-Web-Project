const usersModels = require("../models/users.models")

const isAuthenticated  = function(req,res,next) {
    let token= req.get('X-Authorization')
    usersModels.getIdFromToken(token, (err,id)=>{
        if(err || id===null){
            return res.sendStatus(401)
        }
        next();
    })
 
}


const isValid  = function(req,res,next) {
    const bodyAllowedList = new Set (['first_name', 'last_name','email', 'password'])
        for (const prop in req.body) {
            if(req.body.hasOwnProperty(prop) && !bodyAllowedList.has(prop)) {
                return res.sendStatus(400)
            }
          }
        next();
   
 
}
module.exports ={
    isAuthenticated:isAuthenticated,
    isValid:isValid
}