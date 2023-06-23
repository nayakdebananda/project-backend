const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  _id:{
    type:String,
    require:true,
  },
  projects: [
    {
      projectId: {
        type: mongoose.Types.ObjectId,
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
      description: {
        type: String,
      },
    },
  ],
},{versionKey:false})

exports.User = mongoose.model("users", schema)
