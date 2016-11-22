'use strict'

const sqlite = require('sqlite3')

class Database extends sqlite.Database {
  setupTables (cb) {
    const query = `create table if not exists skills (
      name text primary key,
      desc text unique,
      icon text not null,
      row integer not null,
      side integer not null
    )`
    this.run(query, cb)
  }
}

module.exports = Database
