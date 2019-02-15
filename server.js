require('dotenv').config()
require('./database')
const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')
const apiRoutes = require('./api/routes/api')

// Set up middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(`/api/${process.env.API_VERSION}`, apiRoutes)
app.use(clientErrorHandler)
app.use(logErrors)

const httpPort = process.env.HTTP_PORT || 9000
const httpServer = http.createServer(app)

/**
 * Give back friendly JSON error consumable by the client
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
function clientErrorHandler(err, req, res, next) {
    res.status(err.response ? err.response.status: 500).json({message: err.message})
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

