const { validationResult } = require("express-validator");
const response = require("../utils/response");
const USER = require("../models/USER");
const jwt = require("jsonwebtoken");

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


const login = async (req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            response(res,400,false,errors.array()[0].msg,errors.array())
        }
        
        const {email,password} = req.body;
        const user = await USER.findOne({email});

        if(!user){
            response(res,400,false,"Invalid email or password")
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            response(res,400,false,"Invalid email or password")
        }

        const token = jwt.sign({
            id : user._id,
        },
            process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXPIRES_IN
        })


        response(res,200,true,"Login successful",{
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })

    } catch (error) {
        response(res,500,false,"Internal server error",error.message)
    }
}



module.exports ={
    register,login
}