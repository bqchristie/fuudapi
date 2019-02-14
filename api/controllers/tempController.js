//let mongoose = require('mongoose')
let Temp = require('../models/temp')
let _ = require('lodash')
let axios = require('axios')

/**
 *
 * @param cities
 * @returns {Promise<any>}
 */
function getCurrentTemps(cities) {

    /* TODO: Add date param ot query */
    return new Promise(function(resolve, reject) {
        Temp.find({
            'city': { $in: cities}
        }).then( results => {
            resolve(results);
        })
    });
}

/**
 *
 * @param savedCities
 * @param requestedCities
 */
function getMissingTemps(requestedCities, existingTemps) {

    return new Promise(function(resolve, reject) {
        let missingCities = _.difference(requestedCities,  _.map(existingTemps,'city'));

        Promise.all(getOpenWeatherCalls(missingCities)).then( responses => {
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
function getOpenWeatherCalls(cities){
    return  cities.map( city => {
        return axios.get(getOpenWeatherUrl(city))
    })
}

/**
 *
 * @param city
 * @returns {string}
 */
function getOpenWeatherUrl(city) {
    let url = `${process.env.OPEN_WEATHER_URL}?q=${city}&APPID=${process.env.OPEN_WEATHER_API_KEY}`
    console.log(url);
    return url
}



/**
 *
 * @param cities
 * @returns {Promise<any>}
 */
async function  getTemps(cities) {
    const savedTemps = await getCurrentTemps(cities)
    const newTemps = await getMissingTemps(cities, savedTemps)
    return savedTemps.concat(newTemps)

}

module.exports = {
    getTemps: getTemps
}