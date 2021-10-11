require('./src/database')
const insertTables = require('./src/insert')
const fetchTable = require('./src/fetch')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * @description This api endpoint executes a script that pulls the two tables from the spreadsheet and saves the data to monogdb atlas
 */
app.get('/save-spreadsheet', (req, res) => {
  insertTables('./files/data.xlsx')
    .then(data => {
      res.json({ status: 'Successfully uploaded both tables' })
    })
    .catch(error => {
      console.error(error)
      res.json({ status: 'Upload was not successful' })
    })
})

/**
 * @description This API Endpoint fetches one of the two tables from the database depending on the query string and sends it to the caller
 * @query The query string comes in the format 'type=query', where query =BuyRequest or SellRequest
 */
app.get('/fetch-table', (req, res) => {
  fetchTable(req.query.type)
    .then(data => { res.json(data) })
    .catch(err => {
      console.log(err)
      res.json({ status: 'Database error' })
    })
})

app.listen(port, () => {
  console.log(`Listening at port:${port}`)
})
