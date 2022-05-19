const express = require('express')
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db')

const minionsRouter = express.Router()

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id)
  if (!minion) {
    res.status(404).send();
  } else {
    req.minion = minion
    next()
  }
})
minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id)
  if (!work) {
    res.status(400).send();
  } else {
    req.work = work
    next()
  }
})


minionsRouter.get('/', (req, res) => {
  res.send(getAllFromDatabase('minions'))
})
minionsRouter.post('/', (req, res) => {
  const { name, title, salary, weaknesses } = req.body

  const minions = getAllFromDatabase('minions')
  const newMinion = addToDatabase('minions', {
    name, title, salary: Number(salary), weaknesses, id: minions.length - 1
  })
  res.status(201).send(newMinion)
})
minionsRouter.get('/:minionId', (req, res) => {
  res.send(req.minion)
})
minionsRouter.delete('/:minionId', (req, res) => {
  deleteFromDatabasebyId('minions', req.minion.id)
  res.status(204).send('deleted the minion successfully')
})
minionsRouter.put('/:minionId', (req, res) => {
  const { name, title, salary, weaknesses } = req.body
  const updatedMinion = updateInstanceInDatabase('minions', {
    name, title, salary: Number(salary), weaknesses, id: req.minion.id
  })
  res.send(updatedMinion)
})


minionsRouter.get('/:minionId/work', (req, res) => {
  res.send(getAllFromDatabase('work').filter(w => w.minionId === req.minion.id))
})

minionsRouter.put('/:minionId/work/:workId', (req, res) => {
  const { title, description, hours } = req.body
  if (req.work.minionId == req.minion.id) {
    const updatedWork = updateInstanceInDatabase('work', {
      title, description, hours: Number(hours), id: req.work.id, minionId: req.minion.id
    })
    res.send(updatedWork)
  } else {
    res.status(400).send()
  }

})
minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
  deleteFromDatabasebyId('work', req.work.id)
  res.status(204).send('deleted the work successfully')
})

minionsRouter.post('/:minionId/work', (req, res) => {
  const { title, description, hours } = req.body
  const works = getAllFromDatabase('work')
  const updatedWork = addToDatabase('work', {
    title, description, hours: Number(hours), id: works.length - 1, minionId: req.minion.id
  })
  res.status(201).send(updatedWork)
})

module.exports = minionsRouter