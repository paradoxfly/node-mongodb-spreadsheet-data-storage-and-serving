const Database = require('./src/database')
const express = require('express')
const app = express()
const port = 3000

//  Connect mongoose to database
// const database = new Database()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at port:${port}`)
})
