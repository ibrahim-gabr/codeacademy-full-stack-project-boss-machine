const express = require('express')

const {getAllFromDatabase , createMeeting , deleteAllFromDatabase ,addToDatabase } = require('../db')

const meetingsRouter = express.Router()

meetingsRouter.get('/',(req,res) => {
  res.send(getAllFromDatabase('meetings'))
})
meetingsRouter.post('/',(req,res) => {
  const meeting = createMeeting()
  addToDatabase('meetings',meeting)
  res.status(201).send(meeting)
})
meetingsRouter.delete('/',(req,res) => {
  deleteAllFromDatabase('meetings')
  res.status(204).send()
})

module.exports = meetingsRouter