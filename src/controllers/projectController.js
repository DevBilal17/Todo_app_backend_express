const PROJECT = require("../models/PROJECT");
const response = require("../utils/response")



const createProject = async (req,res) => {
    try {
        const {title,description} = req.body;
        const isExist = await PROJECT.findOne({title});
        if(isExist){
            return response(res,400,false,"Project with this title already exists")
        }
        const project = await PROJECT.create({
            title,
            description,
            user : req.user._id
        })
        project.save();
        return response(res,201,true,"Project created successfully",project)
    } catch (error) {
        return response(res,500,false,"Internal server error",error.message)
    }
}

const getUserProjects = async (req,res) => {
    try {
        const projects = await PROJECT.find({user : req.user._id,isDeleted : false}).sort({createdAt : -1});
        return response(res,200,true,"Projects fetched successfully",projects)
    } catch (error) {
        return response(res,500,false,"Internal server error",error.message)
    }
}


//Not implemented yet
const getProjectById = async (req,res) => {
    
}

//Not implemented yet
const updateProject = async (req,res) => {}

const softDeleteProject = async (req,res) => {
      try {
        const {id} = req.params;
        const project = await PROJECT.findOne({_id : id,user : req.user._id,isDeleted : false});
        if(!project){
            return response(res,404,false,"Project not found or already deleted")
        }
        project.isDeleted = true;
        await project.save();
        const projects = await PROJECT.find({user : req.user._id,isDeleted : false}).sort({createdAt : -1});
        return response(res,200,true,"Project deleted successfully",projects)
    } catch (error) {
        return response(res,500,false,"Internal server error",error.message)
    }
}



module.exports = {
    createProject,
    getUserProjects,
    softDeleteProject,
    getProjectById,
    updateProject,
}
