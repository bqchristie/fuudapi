const moment = require('moment')
const util = require('./tempeartureReadingController.util')
const TemperatureReading = require('../models/temperatureReading')

test('Should find missing cities when passed string[] of cities and object[] reading', () => {
  let requestedCities = ['New York', 'Boston', 'Toronto', 'Las Vegas']
  let existingReadings = [{ city: 'Boston' }, { city: 'Toronto' }]

  let missingCities = util.getMissingCities(requestedCities, existingReadings)

  expect(Array.isArray(missingCities)).toBe(true)
  expect(missingCities.length).toBe(2)
  expect(missingCities.includes('New York')).toBe(true)
  expect(missingCities.includes('Las Vegas')).toBe(true)
})

test('Should set the date threshold properly', () => {
  let threshold
  let now
  process.env.REFRESH_INTERVAL = 1
  process.env.REFRESH_UNIT = 'hours'

  threshold = util.getRefreshTreshold()
  now = moment()
  expect(now.diff(threshold, 'hours')).toBe(1)


  process.env.REFRESH_UNIT = 'days'
  threshold = util.getRefreshTreshold()
  now = moment()
  expect(now.diff(threshold, 'days')).toBe(1)

  process.env.REFRESH_INTERVAL = 5
  threshold = util.getRefreshTreshold()
  now = moment()
  expect(now.diff(threshold, 'days')).toBe(5)


})

test('getOpenWeatherCalls should return an array of promises when pass a string []', () => {
  let requestedCities = ['New York', 'Boston', 'Toronto', 'Las Vegas']
  let promises = util.getOpenWeatherCalls(requestedCities)
  expect(promises.length).toBe(4)
  expect(promises[0] instanceof Promise).toBe(true)
})

test('transposing data we get back from Open Weather to our model', () => {
  let data = {
    name: 'Portland',
    main: { temp: 999 }
  }
  let reading = util.transposeOpenWeatherData(data)
  expect(reading instanceof TemperatureReading).toBe(true)
  expect(reading.city).toBe('Portland')
  expect(reading.temperature).toBe(999)
})