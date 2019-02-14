let mongoose = require('mongoose')
let Schema = mongoose.Schema
let tempSchema = Schema({
    city: String,
    temperature: Number,
    createdAt:  {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Temp', tempSchema)