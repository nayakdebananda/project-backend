const { Project } = require("./projectsModel")
async function getMockResponses(option) {
  const data = await Project.findOne(option)
  return data
}

module.exports = { getMockResponses }
