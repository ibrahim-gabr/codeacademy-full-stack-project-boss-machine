const express = require('express');
const app = require('../server');
const minionsRouter = require('./routes/minionsRouter')
const meetingsRouter = require('./routes/meetingsRouter')
const ideasRouter = require('./routes/ideasRouter')
const workRouter = require('./routes/workRouter')
const apiRouter = express.Router();


app.use('/api/minions' , minionsRouter)
app.use('/api/meetings' , meetingsRouter)
app.use('/api/ideas' , ideasRouter)
app.use('/api/work' , workRouter)
module.exports = apiRouter;
