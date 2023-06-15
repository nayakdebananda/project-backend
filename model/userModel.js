const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  userId: {
    type: String,
    unique:true,
    require: true,
  },
  projects: [{ type: mongoose.Types.ObjectId, ref: "projects" }],
})

exports.User = mongoose.model("user", schema)
