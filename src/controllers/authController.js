const { validationResult } = require("express-validator");
const response = require("../utils/response");
const USER = require("../models/USER");
const jwt = require("jsonwebtoken");

const register = async (req,res)=>{
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return response(res,400,false,errors.array()[0].msg,errors.array())
        }
        
        const {name , email,password} = req.body;
        const emailExists = await USER.findOne({email});
        if(emailExists){
            return response(res,400,false,"Email already exists")
        }

        

        const user = await USER.create({
            name,
            email,
            password
        })

        user.save();

        return response(res,201,true,"User registered successfully",{
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role
        })
        
    } catch (error) {
        return response(res,500,false,"Internal server error",error.message)
    }
}


const login = async (req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return response(res,400,false,errors.array()[0].msg,errors.array())
        }
        
        const {email,password} = req.body;
        const user = await USER.findOne({email});

        if(!user){
            return response(res,400,false,"Invalid email or password")
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return response(res,400,false,"Invalid email or password")
        }

        const token = jwt.sign({
            id : user._id,
        },
            process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXPIRES_IN
        })


        return response(res,200,true,"Login successful",{
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })

    } catch (error) {
        return response(res,500,false,"Internal server error",error.message)
    }
}



module.exports ={
    register,login
}