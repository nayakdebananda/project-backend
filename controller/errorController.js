function errorController(req, res) {
  res.status(404).json({
    message: "Not found",
    documentation_url: "https://backend.io",
  })
}

module.exports = errorController

