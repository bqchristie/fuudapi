let router = require("express").Router()
let _ = require('lodash')
let temperatureReadingController = require("../controllers/temperatureReadingController")

/*
 *   Create an endpoint in node that accepts minimum two cities and then calls
 *   an open weather API (ie. /endpoint/cities/toronto|chicago )
 */
router.get("/cities/:cities", function(req, res, next) {

    let cities = getCities(req)

    if (!isValidRequest(cities)) {
        return res
            .status(400)
            .json({ message: "Please provide two or more cities" })
    }

    temperatureReadingController
        .getReadings(cities)
        .then(data => {
            return res.json(data)
        })
        .catch(next)
});

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
    return req.params.cities.split("|").map(city => _.startCase(city.toLowerCase()))
}

/**
 * Validate that we have a minimum two cities and then calls.
 *
 * @param cities
 * @returns {*|boolean}
 */
function isValidRequest(cities) {
    return cities && Array.isArray(cities) && cities.length >= 2;
}

module.exports = router;
