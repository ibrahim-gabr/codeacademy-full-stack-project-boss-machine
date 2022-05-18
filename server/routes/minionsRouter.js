const express = require('express')
const {getAllFromDatabase, addToDatabase ,getFromDatabaseById,updateInstanceInDatabase,deleteFromDatabasebyId} = require('../db')

const minionsRouter = express.Router()

minionsRouter.param('minionId',(req,res,next,id) => {
    const minion = getFromDatabaseById('minions',id )
    if(!minion){
      res.status(404).send();
    }else{
      req.minion = minion
      next()
    }
})

minionsRouter.get('/',(req,res) => {
  res.send(getAllFromDatabase('minions'))
})
minionsRouter.post('/',(req,res) => {
  const {name , title , salary  , weaknesses} = req.body
  console.log(name , title , salary , weaknesses)
  const minions = getAllFromDatabase('minions')
  const newMinion = addToDatabase('minions',{
    name , title , salary:Number(salary) , weaknesses ,id:minions.length -1
  })
  res.status(201).send(newMinion)
})
minionsRouter.get('/:minionId',(req,res) => {
  res.send(req.minion)
})
minionsRouter.delete('/:minionId',(req,res) => {
    deleteFromDatabasebyId('minions',req.minion.id)
    res.status(204).send('deleted the minion successfully')
})
minionsRouter.put('/:minionId',(req,res) => {
  const {name , title , salary  , weaknesses} = req.body
  const updatedMinion = updateInstanceInDatabase('minions',{
    name , title , salary:Number(salary) , weaknesses ,id:req.minion.id
  })
  res.send(updatedMinion)
})

module.exports = minionsRouter