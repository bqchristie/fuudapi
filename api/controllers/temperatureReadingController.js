const TemperatureReading = require('../models/temperatureReading')
const util = require('./tempeartureReadingController.util')

/**
 * Return saved readings for a given list of cities extra long extra long extra long
 * within a given time threshold.
 *
 * @param cities
 * @returns {Promise<any>}
 */
function getExistingReadings(cities) {
  return new Promise(function(resolve, reject) {
    TemperatureReading.find({
      city: { $in: cities },
      createdAt: { $gt: util.getRefreshTreshold() }
    }).then(results => {
      resolve(results)
    }).catch(err => reject(err))
  })
}


/**
 * Compares the list of cities requested vs the list of cities where
 * we already have readings.  For the missing cities we'll make an API call
 * and save to the DB.  We then return the list of new readings.
 *
 * @param savedCities
 * @param requestedCities
 */
function getMissingReadings(requestedCities, existingReadings) {
  return new Promise(function(resolve, reject) {
    let missingCities = util.getMissingCities(requestedCities, existingReadings)

    Promise.all(util.getOpenWeatherCalls(missingCities))
      .then(responses => {
        let readings = responses.map(resp => {
          return util.transposeOpenWeatherData(resp.data)
        })
        TemperatureReading.insertMany(readings, (err) => {
          if (err) throw err
          resolve(readings)
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * This is the public access method for a list of TemperatureReadings for
 * a given list of cities.
 *
 * @param cities
 * @returns {Promise<any>}
 */
async function getReadings(cities) {
  let existingReadings = await getExistingReadings(cities)
  let newReadings = await getMissingReadings(cities, existingReadings)
  return existingReadings.concat(newReadings)
}

module.exports = {
  getReadings: getReadings
}
