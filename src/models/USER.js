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


userSchema.pre("save",async function(){
    if(this.isModified("password")){
        let genSalt = Number(process.env.BCRYPT_SALT) || 10
        const salt = await bcrypt.genSalt(genSalt);
        this.password = await bcrypt.hash(this.password,salt);
    }
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const USER = mongoose.model("USER",userSchema);

module.exports = USER;