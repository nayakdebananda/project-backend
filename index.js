const express = require('express')
const app = express.Router()


const publicRoute = require('./routes/publicRoute')
const projectRoute = require('./routes/projectRoute')

app.use("/api",publicRoute)
app.use('/project',projectRoute)


module.exports = app