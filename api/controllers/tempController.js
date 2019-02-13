//let mongoose = require('mongoose')
let Temp = require('../models/temp')
let _ = require('lodash')
let axios = require('axios')

/**
 *
 * @param cities
 * @returns {Promise<any>}
 */
function findSavedTemps(cities) {

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
function getMissingTemps(requestedCities, savedCities) {
    var savedCities = _.map(savedCities,'city')
    let missingTemps = _.difference(requestedCities, savedCities);


    missingTemps.forEach( city => {
        getNewTemp(city);
    })
    return findSavedTemps();
}

/**
 *
 * @param city
 */
function getNewTemp(city) {
    /* TODO refactor this into config
       handle 404
    */
     */
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=bf89e941da14d9a5e0a60764ed99bf4a`
    axios.get(url).then(resp => {
        let temp = new Temp({
            city:city,
            temperature: resp.data.main.temp
        })
        temp.save();
    }).catch( err => throw err)

}

/**
 *
 * @param cities
 * @returns {Promise<any>}
 */
async function  getTemps(cities) {
    const savedTemps = await findSavedTemps(cities)
    const allTemperatures = await getMissingTemps(cities, savedTemps)
    return allTemperatures;

}

module.exports = {
    getTemps: getTemps
}