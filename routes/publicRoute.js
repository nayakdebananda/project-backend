const express = require('express')
const { Router } = require("express")
const cors = require("cors")
const { Project } = require("../model/projectsModel")
const { User } = require("../model/userModel")
const _ = require("lodash")

const route = Router()
const { publicController } = require("../controller/publicController")
route.get("/", (req, res) => {
  res.send({ message: "mock api public endpoint " })
})

route.use(cors())
route.get("/:id/*", publicController)
route.post("/:id/*", publicController)
route.put("/:id/*", publicController)
route.patch("/:id/*", publicController)
route.delete("/:id/*", publicController)



module.exports = route
