# node-mongodb-spreadsheet-data-storage-and-serving
A script that pulls data from a spreadsheet and saves it to a mongodb database, then serves it via an api endpoint
Both features can be triggered using these two API endpoints :
https://spreadsheet-handler.herokuapp.com/save-spreadsheet
https://spreadsheet-handler.herokuapp.com/fetch-table?type=

The second api endpoint takes one of two queries "BuyRequest" and "SellRequest" which determines which table gets served back to the caller
