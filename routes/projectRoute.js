const express = require('express')
const route = express.Router()
const test = require('../middleware/attachId')
route.use(express.json())
route.use(express.urlencoded({extended:true}))
route.use(test)


route.get('/',(req,res)=>{
    res.send({message:`This is a project route ${req.userId}`})
})

route.get('/:id',(req,res)=>{
    const userId =  req.userId
    const projectId = req.params.id
    console.log(projectId);
    res.send({message:`This is a project route ${userId}`,projectId})
})


route.post('/',(req,res)=>{
    console.log(req.body);
    const userId =  req.userId
    res.send({message:`Create a new project for user ${userId}`})
})

module.exports = route