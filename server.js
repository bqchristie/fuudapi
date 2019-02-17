require('dotenv').config()
require('./database')
const _ = require('lodash')
const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')
const apiRoutes = require('./api/routes/api')

// Make sure that envrionment variables are set up
validateConfiguration()

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(`/api/${process.env.API_VERSION}`, apiRoutes)
app.use(clientErrorHandler)
app.use(logErrors)

const httpPort = process.env.HTTP_PORT || 9000
const httpServer = http.createServer(app)

/**
 * Check to see that all parameters are set in the .env file
 */
function validateConfiguration() {
  let configs = [
    'OPEN_WEATHER_URL',
    'OPEN_WEATHER_API_KEY',
    'OPEN_WEATHER_UNITS',
    'DB_URL',
    'API_VERSION',
    'REFRESH_INTERVAL',
    'REFRESH_UNIT'
  ]

  let errors = []
  configs.forEach(config => {
    if (_.isEmpty(process.env[config])) {
      errors.push(`missing entry in .env for ${config}`)
    }
  })

  if (errors.length > 0) throw new Error('\n' + errors.join('\n'))
}

/**
 * Give back friendly JSON error consumable by the client
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
function clientErrorHandler(err, req, res, next) {
  res
    .status(err.response ? err.response.status : 500)
    .json({ message: err.message })
  next(err)
}

/**
 *  Log the full error and stack trace for debugging.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
function logErrors(err, req, res, next) {
  console.error(err.stack)
  next(err)
}

httpServer.listen(httpPort, () => {
  console.log('HTTP Server running on port ' + httpPort)
})
