/**
 * @description This function fetches and parses a spreadsheet file into a two-dimensional array of its contents
 * @param {*} The relative path of the spreadsheet
 * @returns {*} Returns a promise with a two-dimensional array of the spreadsheet's contents
 */
async function getSpreadsheet (path) {
  const result = {}
  const xlsxFile = require('read-excel-file/node')
  await xlsxFile(path, { sheet: 'IPHONES' })
    .then(rows => {
      Object.assign(result, rows)
    })
    .catch(err => console.log(err))
  return result
}

/**
 * @description This function processes the two-dimensional array spreadsheet data into one of the tables contained in it
 * @param {*} index of the starting row of the table's data counting from 0
 * @param {*} index of the  starting column of the table's data counting from 0
 * @param {Array} The two-dimensional array containing the spreadsheet's data
 * @returns {*} Returns an object containing data of the buy and sell tables
 */
function getTable (i, j, rows) {
  const phones = {
    'iPhone XS Max': { numberOfStorageSpaces: 3 },
    'iPhone XS': { numberOfStorageSpaces: 3 },
    'iPhone XR': { numberOfStorageSpaces: 3 },
    'iPhone X': { numberOfStorageSpaces: 2 },
    'iPhone 8 PlUS': { numberOfStorageSpaces: 2 },
    'iPhone 8': { numberOfStorageSpaces: 2 },
    'iPhone 7 PLUS': { numberOfStorageSpaces: 3 },
    'iPhone 7': { numberOfStorageSpaces: 3 },
    'iPhone 6S PLUS': { numberOfStorageSpaces: 4 },
    'iPhone 6S': { numberOfStorageSpaces: 4 },
    'iPhone 6 PLUS': { numberOfStorageSpaces: 3 },
    'iPhone 6': { numberOfStorageSpaces: 3 },
    'iPhone SE': { numberOfStorageSpaces: 3 }
  }
  for (const x of Object.entries(phones)) {
    const phoneName = x[0]
    const numberOfStorageSpaces = x[1].numberOfStorageSpaces
    Object.assign(phones[phoneName], getPhone(i, j, numberOfStorageSpaces, rows))
    i += x[1].numberOfStorageSpaces + 2
    delete phones[phoneName].numberOfStorageSpaces
  }
  return phones
}

/**
 * @description This function gets all the information about a phone in the spreadsheet separating them by storage size
 * @param {*} x-index of the first storage space cell
 * @param {*} y-index of the first storage space cell
 * @param {*} number of storage sizes
 * @param {*} Object containing all data in the spreadsheet
 * @returns {*} Object containing prices of the phone in this format: {['storage size', ...prices]}
 */
function getPhone (i, j, n, spreadsheet) {
  const phoneGrade = ['New', 'A1', 'A2', 'B1', 'B2', 'C', 'C/B', 'C/D']
  const finalI = i + n
  const finalJ = j + 8
  const phones = {}
  for (let I = i; I < finalI; I++) {
    let count = 0
    let index = 0
    let storageSize = ''
    for (let J = j; J <= finalJ; J++) {
      if (count === 0) {
        storageSize = spreadsheet[I][J]
        phones[storageSize] = {}
        count += 1
        continue
      }
      phones[storageSize][phoneGrade[index]] = spreadsheet[I][J]
      index += 1
    }
  }
  return phones
}

/**
 * @description Processes the spreadsheet buy and sell tables into two objects
 * @param {*} String of relative path of the spreadsheet
 * @returns Promise of Object containing data from both tables
 */
async function getProcessedSpreadsheet (path) {
  const object = { BuyRequests: {}, SellRequests: {} }
  await getSpreadsheet(path)
    .then(spreadsheet => {
      object.BuyRequests = getTable(4, 1, spreadsheet)
      object.SellRequests = getTable(4, 12, spreadsheet)
    })
    .catch(err => console.log(err))
  return object
}

module.exports = getProcessedSpreadsheet
