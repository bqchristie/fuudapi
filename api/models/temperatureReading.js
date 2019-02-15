let mongoose = require('mongoose')
let Schema = mongoose.Schema
let temperatureReadingSchema = Schema({
    city: String,
    temperature: Number,
    createdAt:  {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TemperatureReading', temperatureReadingSchema)