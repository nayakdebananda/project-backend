const express = require('express')
const app = express.Router()
const cors = require('cors')

const publicRoute = require('./routes/publicRoute')
const projectRoute = require('./routes/projectRoute')

app.use("/api",publicRoute)
var corsOptions = {origin:'http://localhost:3000',credentials:true}
app.use(cors(corsOptions))
app.use('/project',projectRoute)


module.exports = app