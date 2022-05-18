const express = require('express')
const {getAllFromDatabase} = require('../db')

const workRouter = express.Router()

workRouter.get('/',(req,res) => {
  res.send(getAllFromDatabase('works'))
})

module.exports = workRouter