const mongoose = require('mongoose')




const schema = new mongoose.Schema({
    projectId:{
        type:String,
        require:true,
    },
    url:{
        type:String,
        require:true
    },
    method:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    responses:{
        type:[]
    }
})

exports.Project = mongoose.model("projects",schema)