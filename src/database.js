const mongoose = require('mongoose')

// const server = '127.0.0.1:27017'
// const database = 'myDatabase'

class Database {
  constructor () {
    this._connect()
  }

  _connect () {
    const uri = 'mongodb+srv://paradoxfly:teacher080@cluster0.z5us6.mongodb.net/mongoose?retryWrites=true&w=majority'
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
