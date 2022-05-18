const express = require('express')
const {getAllFromDatabase} = require('../db')

const ideasRouter = express.Router()

ideasRouter.get('/',(req,res) => {
  res.send(getAllFromDatabase('ideas'))
})

module.exports = ideasRouter