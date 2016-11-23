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

  insertSkill (params, cb) {
    let success
    const requiredStrings = ['name', 'desc', 'icon']
    success = requiredStrings.every(key => {
      if (!params[key] || !params[key].length) {
        cb(new Error(`Missing or invalid required string parameter '${key}'.`))
        return false
      }
      return true
    })
    if (!success) return

    const requiredNumbers = ['row', 'side']
    success = requiredNumbers.every(key => {
      if (params[key] == null || typeof params[key] !== 'number') {
        cb(new Error(`Missing or invalid required number parameter '${key}'.`))
        return false
      }
      return true
    })
    if (!success) return

    const query = `insert into skills (name, desc, icon, row, side) values (?, ?, ?, ?, ?)`
    const values = [params.name, params.desc, params.icon, params.row, params.side]
    this.run(query, values, cb)
  }
}

module.exports = Database
