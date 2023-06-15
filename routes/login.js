const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const KEY = "DEBA"

route.get("/", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  try {
    const user = jwt.verify(token, KEY)
    res.send(user)
  } catch (error) {
    res.status(401).send({error:"Authentication failed"})
  }
  
})


route.post("/", async (req, res) => {
  const { email, password } = req.body

  const accessToken = generateAccessToken(req.body)
  try{
    const refreshToken = jwt.sign(req.body, KEY)
    res.send({ accessToken, refreshToken })
    console.log(refreshToken);
  }catch(e){
    res.send({error:"wrong"})
  }
  
})


route.post("/register", async (req, res) => {
  const { name,email, password,confirmPassword } = req.body
  if(password!=confirmPassword) res.send({message:"password mismatch"})
  const accessToken = generateAccessToken(req.body)
  try{
    const refreshToken = jwt.sign(req.body, KEY)
    res.send({ accessToken, refreshToken })
    console.log(refreshToken);
  }catch(e){
    res.send({error:"wrong"})
  }
   
})

route.get("/token", (req, res) => {
  const token = req.body.token
  jwt.verify(token, KEY,(err,user)=>{
    //find user in database
    if(err) res.status(401).send({error: "Unauthorized user"})
    const accessToken = generateAccessToken({name:user.name,password:user.password})
    res.send({accessToken})
  })
  res.send(user)
})

function generateAccessToken(user) {
  return jwt.sign(user, KEY, { expiresIn: "60s" })
}

module.exports = route
