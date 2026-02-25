const USER = require("../models/USER");
const response = require("../utils/response");


const protect = async(req,res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        const token = req.headers.authorization.split(" ")[1];

        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await USER.findById(decoded.id).select("-password");
        if(!req.user){
            return response(res,401,false,"User not found")
        }
        next();
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return response(res,401,false,"Token expired - Login Again")
            }
            response(res,401,false,"Invalid token",error.message)
        }
         
    }

    else{
        response(res,401,false,"No Token Provided",error.message)
    }
}


module.exports = protect