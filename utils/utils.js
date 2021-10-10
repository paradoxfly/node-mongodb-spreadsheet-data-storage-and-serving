/**
 * @description This function fetches and parses a spreadsheet file into a two-dimensional array of its contents
 * @param {*} The relative path of the spreadsheet
 * @returns {*} Returns a promise with a two-dimensional array of the spreadsheet's contents
 */
async function getSpreadsheet (path) {
  const xlsxFile = require('read-excel-file/node')
  const result = await xlsxFile(path, { sheet: 'IPHONES' })
  return result
}

/**
 * @description This function processes the two-dimensional array spreadsheet data into two objects representing the buy and sell request tables
 * @param {Array} The two-dimensional array containing the spreadsheet's data
 * @returns {*} Returns an object containing data of the buy and sell tables
 */
function splitSpreadsheet (rows) {
  // console.log(rows[3])
  let phoneGrade = ['New', 'A1', 'A2', 'B1', 'B2', 'C', 'C/B', 'C/D']
  let phones = ['iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X', 'iPhone 8 PlUS', 'iPhone 8', 'iPhone 7 PLUS', 'iPhone 7', 'iPhone 6S PLUS', 'iPhone 6S', 'iPhone 6 PLUS', 'iPhone 6', 'iPhone SE']
  let buyRequest = {}
  let sellRequest = {}

  // for (let j = 1; j < 10; j++) {
  //   console.log(rows[4][j])
  // }
  console.log(getPhone(4, 1, rows))
}

/**
 * @description This function gets all the information about a phone in the spreadsheet separating them by storage size
 * @param {*} x-index of the first storage space cell
 * @param {*} y-index of the first storage space cell
 * @param {*} Object containing all data in the spreadsheet
 * @returns {*} object containing prices of the phone in this format: {['storage size', ...prices]}
 */
function getPhone (i, j, spreadsheet) {
  const finalI = i + 3
  const finalJ = j + 8
  let phones = {}
  for (i; i <= finalI; i++) {
    // let temp = []
    let count = 0
    let storageSize = ''
    for (j; j <= finalJ; j++) {
      if (count === 0) {
        storageSize = spreadsheet[i][j]
        phones[storageSize] = []
        continue
      }
      phones[storageSize].push(spreadsheet[i][j])
      count++
    }
  }
  return phones
}
getSpreadsheet('./files/data.xlsx').then(data => splitSpreadsheet(data))
