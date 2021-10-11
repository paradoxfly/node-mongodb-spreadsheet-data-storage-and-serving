require('./database')
const getProcessedSpreadsheet = require('../utils/spreadsheet')
const mongoose = require('mongoose')

/**
 * @description This function inserts the two tables into the mongo db database
 * @param {*} String representing relative path of the spreadsheet file
 * @returns null
 */
async function insertTables (path) {
  const tableSchema = new mongoose.Schema({
    name: String,
    ok: String
  })
  const BuyRequest = mongoose.model('BuyRequest', tableSchema)
  const SellRequest = mongoose.model('SellRequest', tableSchema)

  const temp = {
    name: 'Ola',
    ok: 'done'
  }
  BuyRequest.create(temp, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })
  // await getProcessedSpreadsheet(path).then(data => {
  //   BuyRequest.create(data.BuyRequests, (err, result) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(result)
  //     }
  //   })
  //   SellRequest.create(data.SellRequests, (err, result) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(result)
  //     }
  //   })
  // })
}

insertTables('./files/data.xlsx')
module.exports = { insertTables }
