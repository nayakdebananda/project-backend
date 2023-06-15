const admin = require('../util/firebase')
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(" ")[1]
  console.log(idToken)
  if (!idToken) {
    res.status(403).send({ message: "token mission" })
    return
  }
  try {
    const user = await admin.auth().verifyIdToken(idToken)
    console.log(user)
  } catch (e) {
    console.log(e)
    res.status(403).send({ message: "error" })
    return
  }
  next()
}

module.exports = verifyToken