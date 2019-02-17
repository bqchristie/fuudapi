const mongoose = require('mongoose')
const dbOptions = require('./database.options')


class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(process.env.DB_URL, dbOptions)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}

module.exports = new Database()