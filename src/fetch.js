const mongoose = require('mongoose')
const tableSchema = require('./tableSchema')
const BuyRequest = mongoose.model('BuyRequest', tableSchema)
const SellRequest = mongoose.model('SellRequest', tableSchema)

/**
 * @description This function fetches a table from the mongodb database depending on the query passed to it
 * @param {*} String which has to either be 'BuyRequest' or 'SellRequest'
 * @returns {*} Object containing all the data from the table requested for
 */
async function fetchTable (query) {
  const data = { response: 'Query string not recognized' }
  if (query === 'BuyRequest') {
    await BuyRequest.find({})
      .then(doc => {
        console.log(doc)
        delete data.response
        Object.assign(data, doc)
      })
      .catch(err => {
        console.error(err)
      })
  } else if (query === 'SellRequest') {
    await SellRequest.find({})
      .then(doc => {
        console.log(doc)
        delete data.response
        Object.assign(data, doc)
      })
      .catch(err => {
        console.error(err)
      })
  }
  return data
}

module.exports = fetchTable
