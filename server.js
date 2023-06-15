const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")


const errorController = require("./controller/errorController")
const connection = require("./util/connection")
const index = require("./index")
const verifyToken = require('./middleware/verifyToken')

connection()

app.use("/", index)

var corsOptions = {origin:'http://localhost:3000',credentials:true}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", verifyToken, async (req, res) => {
  res.status(200).json({ message: "Backend.io server" })
})

app.get("/*", errorController)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
