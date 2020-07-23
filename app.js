const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('connected to db'))

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(morgan('dev', {
  skip: () => process.env.NODE_ENV === 'test'
}))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)

module.exports = app
