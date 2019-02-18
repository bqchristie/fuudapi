const _ = require('lodash')
const moment = require('moment')
const axios = require('axios')
const TemperatureReading = require('../models/temperatureReading')

/**
 * Takes a String array of cities and an object array of existing readings.
 * First it maps object array to a string array then does a compare returning
 * the values in requested cities that are not in
 *
 * @param requestedCities
 * @param existingTemps
 * @returns {*}
 */
function getMissingCities(requestedCities, existingTemps) {
  return _.difference(
    requestedCities,
    _.map(existingTemps, 'city')
  )
}


/**
 * Returns the Date that we use to determine if we need
 * a fresh reading.  The refresh interval and units are stored in
 * the .env file.
 *
 * @returns {Date}
 */
function getRefreshTreshold() {
  return moment()
    .subtract(process.env.REFRESH_INTERVAL, process.env.REFRESH_UNIT)
    .toDate()
}

/**
 * Returns an array of promises calling the Open Weather API for a
 * given list of cities.
 *
 * @param cities
 * @returns {*}
 */
function getOpenWeatherCalls(cities) {
  return cities.map(city => {
    return axios.get(getOpenWeatherUrl(city))
  })
}

/**
 * Assembles a URL using properties from the .env file and the given city.
 *
 * @param city
 * @returns {string}
 */
function getOpenWeatherUrl(city) {
  return `${process.env.OPEN_WEATHER_URL}?q=${city}&units=
  ${process.env.OPEN_WEATHER_UNITS}&APPID=${process.env.OPEN_WEATHER_API_KEY}`
}

/**
 * Transpose open weather data to our model
 *
 * @param data
 * @returns {*}
 */
function transposeOpenWeatherData(data) {
  let reading = new TemperatureReading({
    city: data.name,
    temperature: data.main.temp
  })
  return reading
}

module.exports = {
  getMissingCities,
  getRefreshTreshold,
  getOpenWeatherCalls,
  transposeOpenWeatherData
}
