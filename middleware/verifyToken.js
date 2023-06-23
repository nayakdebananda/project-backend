const admin = require("../util/firebase")
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(" ")[1]
  if (!idToken) {
    res.status(403).send({ message: "token mission" })
    return
  }
  try {
    const user = await admin.auth().verifyIdToken(idToken)
    req.userId = user.uid
    console.log({ id: user.uid, email: user.email })
  } catch (e) {
    res.status(403).send({ message: "error" })
    return
  }
  next()
}

module.exports = verifyToken
