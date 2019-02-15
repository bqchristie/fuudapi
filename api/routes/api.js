let router = require('express').Router();
let temperatureReadingController = require('../controllers/temperatureReadingController');

/*
 *   Create an endpoint in node that accepts minimum two cities and then calls
 *   an open weather API (ie. /endpoint/cities/toronto|chicago )
 */
router.get('/cities/:cities', function (req, res, next) {

    let cities = req.params.cities.split('|')

    if (!isValidRequest(cities)) {
        return res.status(400).json({message: 'Please provide two or more cities'});
    }

    temperatureReadingController.getTemps(cities).then( data => {
        return res.json(data);
    }).catch(next)
});


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
