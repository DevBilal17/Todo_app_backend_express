const response = require("../utils/response")


const authorize = (...roles) => {
    return (req,res,next)=>{
        if(!req.user){
            return response(res,401,false,"Not Authenticated")
        }

        if(!roles.includes(req.user.role)){
            return response(res,403,false,"Not Authorized - Access Denied")
        }
        next();
    }
}

module.exports = authorize