const getProcessedSpreadsheet = require('../utils/spreadsheet')
const tableSchema = require('./tableSchema')
const mongoose = require('mongoose')

/**
 * @description This function extracts the two tables from the spreadsheet, parses them into JSON format and inserts them into the mongo db database
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

module.exports = insertTables
