const User = require("../models/User")

const isAdmin = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    // console.log("In is admin")    
    try {
        if(req.user)
        {
            const admin =await User.findOne({_id : req.user.id}) ;
            if(admin.email=="prathmeshpawaru@gmail.com")
            {
                next() ;
            }else
            {
                res.status(401).send({ error: "Admin Required" })
            }
        }
          } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
module.exports = isAdmin;