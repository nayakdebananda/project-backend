require('dotenv').config()
const mongoose = require("mongoose")
const dbURL = process.env.environment? `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@project101.hf8mthv.mongodb.net/?retryWrites=true&w=majority/test`:`mongodb://127.0.0.1:27017/test`
async function connectDB() {
  try {
    await mongoose.connect(dbURL)
    console.log("connected successfully")
  } catch (error) {
    console.log(error)
  }
}
module.exports = connection = async ()=>{
    await connectDB()
}


