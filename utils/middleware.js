const logger = require('./logger')

const unknowEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint '})

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknowEndpoint,
  errorHandler
}
