const { Project } = require("./projectsModel")
async function getMockResponses(option, fields) {
  const data = await Project.findOne(option, fields)
  return data
}

module.exports = { getMockResponses }
