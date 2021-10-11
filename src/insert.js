require('./database')
const getProcessedSpreadsheet = require('../utils/spreadsheet')
const tableSchema = require('./tableSchema')
const mongoose = require('mongoose')

/**
 * @description This function inserts the two tables into the mongo db database
 * @param {*} String representing relative path of the spreadsheet file
 * @returns null
 */
async function insertTables (path) {
  const BuyRequest = mongoose.model('BuyRequest', tableSchema)
  const SellRequest = mongoose.model('SellRequest', tableSchema)

  await getProcessedSpreadsheet(path).then(data => {
    BuyRequest.create(data.BuyRequests, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })
    SellRequest.create(data.SellRequests, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })
  })
}

insertTables('./files/data.xlsx')
module.exports = { insertTables }
