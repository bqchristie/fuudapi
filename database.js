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
        if (err) throw err
      })
  }
}

module.exports = new Database()
