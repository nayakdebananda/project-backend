const mongoose = require("mongoose")

// const schema = new mongoose.Schema({
//     projectId:{
//         type:mongoose.Types.ObjectId,
//         require:true,
//     },
//     url:{
//         type:String,
//         require:true
//     },
//     method:{
//         type:String,
//         require:true
//     },
//     description:{
//         type:String
//     },
//     responses:{
//         type:[]
//     }
// })
const schema = new mongoose.Schema({
  projectId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  description:{
    type:String,
  },
  url: {
    type: String,
    require: true,
  },
  method: {
    type: String,
    require: true,
  },
  statusCode: Number,
  response: {
    type: Object,
    enum:["GET","POST"],
    require: true
  },
},{versionKey:false})
exports.Project = mongoose.model("projects", schema)
