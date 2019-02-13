let mongoose = require('mongoose')
let Schema = mongoose.Schema
let tempSchema = Schema({
    city: String,
    temperature: Number
})
module.exports = mongoose.model('Temp', tempSchema)