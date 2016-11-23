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

  listSkills (cb) {
    const query = `select * from skills`
    this.all(query, cb)
  }

  insertProject (params, cb) {
    let success
    const requiredStrings = [
      'name', 'shortName', 'type', 'image', 'date', 'templateClass'
    ]
    success = requiredStrings.every(key => {
      if (!params[key] || !params[key].length) {
        cb(new Error(`Missing or invalid required string parameter '${key}'.`))
        return false
      }
      return true
    })
    if (!success) return

    const query = `insert into projects (name, shortName, externalLink, type, image, date, templateClass) values (?, ?, ?, ?, ?, ?, ?)`
    const values = [
      params.name, params.shortName, params.externalLink, params.type,
      params.image, params.date, params.templateClass
    ]
    this.run(query, values, cb)
  }

  listProjects (cb) {
    const query = `select * from projects`
    this.all(query, cb)
  }
}

module.exports = Database
