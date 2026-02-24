const { validationResult } = require("express-validator");
const response = require("../utils/response");
const USER = require("../models/USER");


const register = async (req,res)=>{
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            response(res,400,false,errors.array()[0].msg,errors.array())
        }
        
        const {name , email,password} = req.body;
        const emailExists = await USER.findOne({email});
        if(emailExists){
            response(res,400,false,"Email already exists")
        }

        

        const user = await USER.create({
            name,
            email,
            password
        })

        user.save();

        response(res,201,true,"User registered successfully",{
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role
        })
        
    } catch (error) {
        response(res,500,false,"Internal server error",error.message)
    }
}




module.exports ={
    register
}