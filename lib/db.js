'use strict'

const Sequelize = require('sequelize')
const lodash = require('lodash')
const skill = require('./skill')
const project = require('./project')
const EventEmitter = require('events')

class Database extends Sequelize {
  constructor (params) {
    const database = params.database || process.env.DB_NAME
    const username = params.username || process.env.DB_USERNAME
    const password = params.password || process.env.DB_PASSWORD
    const host = params.host || process.env.DB_HOST
    const dialect = process.env.DB_DIALECT || 'postgres'
    super(database, username, password, {
      host: host,
      dialect: dialect,
      dialectOptions: {
        ssl: dialect === 'postgres'
      }
    })

    this.Skill = this.define(skill.name, skill.schema)
    this.Project = this.define(project.name, project.schema)
    this.emitter = new EventEmitter()
    this.sync()
      .then(() => this.emitter.emit('ready'))
      .catch(err => this.emitter.emit('error', err))
  }

  on (evt, func) {
    this.emitter.on(evt, func)
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

  destroySkill (params, cb) {
    if (!params.name) {
      const err = new Error('Can not destroy a skill without a `name`.')
      setImmediate(() => cb(err))
      return
    }

    this.Skill.destroy({ where: { name: params.name } })
      .then(res => setImmediate(() => cb()))
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

  destroyProject (params, cb) {
    if (!params.name) {
      const err = new Error('Can not destroy a project without a `name`.')
      setImmediate(() => cb(err))
      return
    }

    this.Project.destroy({ where: { name: params.name } })
      .then(res => setImmediate(() => cb()))
      .catch(err => setImmediate(() => cb(err)))
  }
}

module.exports = Database
