const { validationResult } = require("express-validator");
const response = require("../utils/response");
const USER = require("../models/USER");
const jwt = require("jsonwebtoken");

const register = async (req,res)=>{
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log("Register One")
            return response(res,400,false,errors.array()[0].msg,errors.array())
        }
        
        const {name , email,password} = req.body;
        const emailExists = await USER.findOne({email});
        if(emailExists){
            console.log("Register Two")
            return response(res,400,false,"Email already exists")
        }

        

        const user = await USER.create({
            name,
            email,
            password
        })

        user.save();
        console.log("Register Three")
        return response(res,201,true,"User registered successfully",{
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role
        })
        
    } catch (error) {
        console.log("Register Four",error)
        return response(res,500,false,"Internal server error",error.message)
    }
}


const login = async (req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log("Login One")
            return response(res,400,false,errors.array()[0].msg,errors.array())
        }
        
        const {email,password} = req.body;
        const user = await USER.findOne({email}).select("+password");

        if(!user){
            console.log("Login Two")
            return response(res,400,false,"Invalid email or password")
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            console.log("Login Three")
            return response(res,400,false,"Invalid email or password")
        }

        const token = jwt.sign({
            id : user._id,
        },
            process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXPIRES_IN
        })

        console.log("Login Four")
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
        console.log("Login Five",error)
        return response(res,500,false,"Internal server error",error.message)
    }
}



module.exports ={
    register,login
}