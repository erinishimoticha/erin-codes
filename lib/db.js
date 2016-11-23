'use strict'

const sqlite = require('sqlite3')
const async = require('async')

class Database extends sqlite.Database {
  setupTables (finalCb) {
    const createSkillsTable = `create table if not exists skills (
      name text primary key,
      desc text unique,
      icon text not null,
      row integer not null,
      side integer not null
    )`
    const createProjectsTable = `create table if not exists projects (
      name text primary key,
      shortName text unique,
      externalLink text,
      type text,
      image text,
      date text,
      templateClass text
    )`

    async.parallel([
      cb => this.run(createSkillsTable, cb),
      cb => this.run(createProjectsTable, cb)
    ], finalCb)
  }
}

module.exports = Database
