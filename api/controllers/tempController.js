//let mongoose = require('mongoose')
let Temp = require('../models/temp')
let _ = require('lodash')
let axios = require('axios')
let moment = require('moment');

/**
 *
 * @param cities
 * @returns {Promise<any>}
 */
function getCurrentTemps(cities) {

    return new Promise(function (resolve, reject) {
            Temp.find({
                'city': {$in: cities},
                'createdAt': {$gt: getRefreshTreshhold()}
            }).then(results => {
                resolve(results)
            })
    });
}

/**
 *
 * @returns {Date}
 */
function getRefreshTreshhold() {
    return moment()
        .subtract(process.env.REFRESH_INTERVAL, process.env.REFRESH_UNIT)
        .toDate()
}

/**
 *
 * @param savedCities
 * @param requestedCities
 */
function getMissingTemps(requestedCities, existingTemps) {

    return new Promise(function (resolve, reject) {
        let missingCities = _.difference(requestedCities, _.map(existingTemps, 'city'));

        Promise.all(getOpenWeatherCalls(missingCities)).then(responses => {
            let readings = []
            responses.forEach(resp => {
                readings.push(createTemp(resp.data))
            })
            resolve(readings);
        })
    })
}

/**
 *
 * @param data
 */
function createTemp(data) {
    let temp = new Temp({
        city: data.name,
        temperature: data.main.temp
    })
    temp.save();
    return temp;
}

/**
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
 *
 * @param city
 * @returns {string}
 */
function getOpenWeatherUrl(city) {
    return `${process.env.OPEN_WEATHER_URL}?q=${city}&APPID=${process.env.OPEN_WEATHER_API_KEY}`
}

/**
 *
 * @param cities
 * @returns {Promise<any>}
 */
async function getTemps(cities) {
    const existingReadings = await getCurrentTemps(cities)
    const newReadings = await getMissingTemps(cities, existingReadings)
    return existingReadings.concat(newReadings)
}

module.exports = {
    getTemps: getTemps
}