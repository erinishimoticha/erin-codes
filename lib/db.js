'use strict'

const Sequelize = require('sequelize')
const lodash = require('lodash')
const skill = require('./skill')
const project = require('./project')

class Database extends Sequelize {
  constructor (params) {
    const database = params.database || process.env.DB_NAME
    const username = params.username || process.env.DB_USERNAME
    const password = params.password || process.env.DB_PASSWORD
    const host = params.host || process.env.DB_HOST
    super(database, username, password, {
      host: host,
      dialect: process.env.DB_DIALECT || 'postgres'
    })

    this.Skill = this.define(skill.name, skill.schema)
    this.Project = this.define(project.name, project.schema)
    this.sync()
  }

  /* setupTables (finalCb) {
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
  } */

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

    const fields = ['name', 'desc', 'icon', 'row', 'side']
    this.Skill.create(lodash.pick(params, fields))
      .then(() => setImmediate(() => cb()))
      .catch(err => setImmediate(() => cb(err)))
  }

  listSkills (cb) {
    this.Skill.findAll({})
      .then(res => {
        setImmediate(() => cb(null, res.map(thing => thing.dataValues)))
      })
      .catch(err => setImmediate(() => cb(err)))
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

    const fields = [
      'name', 'shortName', 'externalLink', 'type', 'image',
      'date', 'templateClass'
    ]

    this.Project.create(lodash.pick(params, fields))
      .then(() => setImmediate(() => cb()))
      .catch(err => setImmediate(() => cb(err)))
  }

  listProjects (cb) {
    this.Project.findAll()
      .then(res => {
        setImmediate(() => cb(null, res.map(thing => thing.dataValues)))
      })
      .catch(err => setImmediate(() => cb(err)))
  }
}

module.exports = Database
