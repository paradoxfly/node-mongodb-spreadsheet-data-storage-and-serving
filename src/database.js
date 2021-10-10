const mongoose = require('mongoose')
require('dotenv').config()

class Database {
  constructor () {
    this._connect()
  }

  _connect () {
    const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.z5us6.mongodb.net/mongoose?retryWrites=true&w=majority`
    mongoose.connect(uri)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error. \nError message: ' + err)
      })
  }
}

module.exports = new Database()
