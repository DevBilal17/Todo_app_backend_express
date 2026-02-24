const response = require("../utils/response");


const register = async (req,res)=>{
    try {
        const {name , email,password} = req.body;
        
    } catch (error) {
        response(res,500,false,"Internal server error",error.message)
    }
}