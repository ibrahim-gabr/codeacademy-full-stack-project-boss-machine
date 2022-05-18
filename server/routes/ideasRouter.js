
const express = require('express')
const {getAllFromDatabase, addToDatabase ,getFromDatabaseById,updateInstanceInDatabase,deleteFromDatabasebyId} = require('../db')

const ideasRouter = express.Router()

ideasRouter.param('ideaId',(req,res,next,id) => {
    const idea = getFromDatabaseById('ideas',id )
    if(!idea){
      res.status(404).send();
    }else{
      req.idea = idea
      next()
    }
})

ideasRouter.get('/',(req,res) => {
  res.send(getAllFromDatabase('ideas'))
})
ideasRouter.post('/',(req,res) => {
  const {name , description , numWeeks  , weeklyRevenue} = req.body
  const minions = getAllFromDatabase('ideas')
  const newMinion = addToDatabase('ideas',{
    name , description , numWeeks:Number(numWeeks) , weeklyRevenue:Number(weeklyRevenue) ,id:minions.length -1
  })
  res.status(201).send(newMinion)
})
ideasRouter.get('/:ideaId',(req,res) => {
  res.send(req.idea)
})
ideasRouter.delete('/:ideaId',(req,res) => {
    deleteFromDatabasebyId('ideas',req.idea.id)
    res.status(204).send('deleted the idea successfully')
})
ideasRouter.put('/:ideaId',(req,res) => {
  const {name , description , numWeeks  , weeklyRevenue} = req.body
  const updatedMinion = updateInstanceInDatabase('ideas',{
    name , description , numWeeks:Number(numWeeks) , weeklyRevenue:Number(weeklyRevenue) ,id:req.idea.id
  })
  res.send(updatedMinion)
})

module.exports = ideasRouter