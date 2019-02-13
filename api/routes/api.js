let router = require('express').Router();
let _ = require('lodash');
let tempController = require('../controllers/tempController');

/*
 *   Create an endpoint in node that accepts minimum two cities and then calls an open
 *   weather API (ie. /endpoint/cities/toronto|chicago )
 *
 *   TODO: Pipe delimted url
 */
router.get('/temps', function (req, res) {
    let cities = req.query.city;

    if (!isValidRequest(cities)) {
        return res.status(400).json({error: {message: 'Please provide one or more cities'}});
    }

    tempController.getTemps(cities).then( data => {
        return res.json(data);
    }).catch( err => {
        return res.status(500).json(err);
    })
});


/**
 *
 * @param cities
 * @returns {*|boolean}
 */
function isValidRequest(cities) {
    return cities && _.isArray(cities) && cities.length >= 2;
}

module.exports = router;
