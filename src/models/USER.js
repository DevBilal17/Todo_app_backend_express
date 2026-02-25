const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required : [true,"Name is required"],
        minlength : [3,"Name must be at least 3 characters long"],
        maxlength : [20,"Name must be at most 20 characters long"]
    },
    email : {
        type:String,
        required : [true,"Email is required"],
        unique : true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please provide a valid email address"],
        lowercase : true,
        trim : true
    },
    password : {
        type:String,
        required : [true,"Password is required"],
        minlength : [6,"Password must be at least 6 characters long"],
        maxlength : [20,"Password must be at most 20 characters long"],
        select : false
    },
    role : {
        type:String,
        enum : ["user","admin"],
        default : "user"
    }
},{
    timestamps : true
})


userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT);
        this.password = await bcrypt.hash(this.password,salt);
    }
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const USER = mongoose.model("USER",userSchema);

module.exports = USER;