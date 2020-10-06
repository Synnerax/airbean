const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db/menu.json')
const db = low(adapter)


// Set some defaults (required if your JSON file is empty)
/*
db.defaults({ 
     products: [],
     order: [],
     count: 0 
    })
  .write()
*/
module.exports = { db };