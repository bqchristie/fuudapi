let router = require('express').Router()
let util = require('./api.util')
let tempReadingCtl = require('../controllers/temperatureReadingController')

/*
 *   Create an endpoint in node that accepts minimum two cities and then calls
 *   an open weather API (ie. /endpoint/cities/toronto|chicago )
 */
router.get('/cities/:cities', function(req, res, next) {

  let cities = util.getCities(req)

  if (!util.isValidRequest(cities)) {
    return res
      .status(400)
      .json({ message: 'Please provide two or more cities' })
  }

  tempReadingCtl
    .getReadings(cities)
    .then(data => {
      return res.json(data)
    })
    .catch(next)
})


module.exports = router
