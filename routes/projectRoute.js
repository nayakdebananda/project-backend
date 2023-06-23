const express = require("express")
const route = express.Router()
const test = require("../middleware/attachId")
const { User } = require("../model/userModel")
const { Project } = require("../model/projectsModel")
const { default: mongoose } = require("mongoose")
const verifyToken = require("../middleware/verifyToken")
route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(verifyToken)

route.get("/", async (req, res) => {
  const userId = req.userId
  try {
    const docs = await User.findOneAndUpdate(
      { _id: userId },
      { $setOnInsert: { _id: userId } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    if (docs.projects) {
      res.send(docs.projects)
      return
    }
    return
  } catch (error) {
    console.log(error)
  }
  res.send({ message: "unexpected error occurs" })
})

route.post("/", async (req, res) => {
  const { name, description } = req.body
  if (!name) {
    res.status(304).send({ message: "missing required data" })
    return
  }
  console.log(req.body)
  const project = { name, description }
  const userId = req.userId
  const isExist = await User.findOne({
    projects: {
      $elemMatch: {
        name,
        description,
      },
    },
  })
  if (!isExist) {
    const doc = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { projects: project } },
      { new: true, upsert: true }
    )
    // console.log(doc)

    res.send(doc.projects)
    return;
  }
  res.status(204).send({message:"no changes"})
})

route.post("/:id", async (req, res) => {
  const userId = req.userId
  const id = req.params.id
  const { url, method, description, response } = req.body
  const statusCode = req.body.statusCode || 200
  if (!url && !method) {
    res.send({ error: "missing data" })
    return
  }
  try {
    const projectId = mongoose.Types.ObjectId.createFromHexString(id)
    const doc = await Project.findOneAndUpdate(
      { projectId, url, method },
      { response, statusCode, description },
      { upsert: true, new: true }
    )

    const result = {
      projectID: doc.projectId,
      url: doc.url,
      method: doc.method,
      statusCode: doc.statusCode,
      description: doc.description,
      response: doc.response,
    }
    res.send(result)
    return
  } catch (error) {
    res.send({ message: error.message })
  }
})

// GET  http://127.0.0.1:8000/project/648a832e4a191f50edd1cd88?links=/posts&method=GET

route.get("/:id", async (req, res) => {
  const userId = req.userId
  const id = req.params.id
  
  const url = req.query.links
  console.log(url)
  const method = req.query.method
  const projectId = mongoose.Types.ObjectId.createFromHexString(id)
  const doc = await Project.find({ projectId, url, method }, { _id: 0 })
  res.send(doc)
})

route.get("/links/:id", async (req, res) => {
  const userId = req.userId
  const id = req.params.id
  const projectId = mongoose.Types.ObjectId.createFromHexString(id)
  const doc = await Project.find({ projectId }, { _id: 0, url: 1, method: 1 })
  res.send(doc)
})

module.exports = route
