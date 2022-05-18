const express = require('express')
const {getAllFromDatabase , createMeeting} = require('../db')

const meetingsRouter = express.Router()

meetingsRouter.get('/',(req,res) => {
  res.send(getAllFromDatabase('meetings'))
})
meetingsRouter.post('/',(req,res) => {
  createMeeting()
})

module.exports = meetingsRouter