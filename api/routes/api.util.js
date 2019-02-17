let _ = require('lodash')

/**
 * Need to split the cities parameter into an Array. Also need to fix the data so that is
 * is properly cased.  The API is not case sensitive on the request but always
 * returns a capiltalized string when returned.  Could deal with this in the controller
 * query but need to normalize at some point.
 *
 * @param req
 * @returns {any[]}
 */
function getCities(req) {
  return req.params.cities.split('|').map(city => _.startCase(city.toLowerCase()))
}

/**
 * Validate that we have a minimum two cities and then calls.
 *
 * @param cities
 * @returns {*|boolean}
 */
function isValidRequest(cities) {
  return cities && Array.isArray(cities) && cities.length >= 2
}

module.exports = {
  getCities,
  isValidRequest
}