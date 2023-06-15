const { getMockResponses } = require("../model/getData")
const _ = require("lodash")
const publicController = async (req, res) => {
  const url = req.url.split("/")
  const projectID = req.url.split("/")[1]
  const endpoint = url.reduce((acc, val, index) => {
    if (index == 1) return acc
    return acc + "/" + val
  })

  console.log("body ",req.body)
  console.log("requested endpoint : ", endpoint)

  const option = { projectId: projectID, method: req.method, url: endpoint }
  const data = await getMockResponses(option, { responses: 1 })
  const response = data?.responses?.filter(d => {
    return _.isEqual(d.body || {}, req.body)
  })[0]

  console.log("desired response ",response)
  if (!response) {
    notFound(req,res)
    return
  }
  
  res.status(response.status).send(response.response)
}

function notFound(req,res) {
  req.headers["content-type"] = "text/html; charset=utf-8"
  res.status(404).send(
  `<!DOCTYPE html>
  <html lang="en/">
  <head>
  <meta charset="utf-8">
  <title>Error</title>
  </head>
  <body>
  <pre>Cannot ${req.method} ${req.url}</pre>
  </body>
  </html>`.trim())
}

module.exports = { publicController }
