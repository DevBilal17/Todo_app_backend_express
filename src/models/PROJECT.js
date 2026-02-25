const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
     title : {
        type:String,
        required : [true,"Project title is required"],
        trim : true,
        minlength : [3,"Project title must be at least 3 characters long"],
        maxlength : [100,"Project title must be at most 100 characters long"]
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


projectSchema.index({user : 1,createdAt : -1},{partialFilterExpression : {isDeleted : false}})

const PROJECT = mongoose.model("Project",projectSchema);

module.exports = PROJECT;