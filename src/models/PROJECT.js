const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true,"Project name is required"],
        trim : true,
        minlength : [3,"Project name must be at least 3 characters long"],
        maxlength : [100,"Project name must be at most 100 characters long"]
    },
    description : {
        type:String,
        trim : true,
        maxlength : [500,"Project description must be at most 500 characters long"]
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    isDeleted : {
        type:Boolean,
        default : false
    }
},{
    timestamps : true
})


const PROJECT = mongoose.model("Project",projectSchema);

module.exports = PROJECT;