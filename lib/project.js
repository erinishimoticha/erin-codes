'use strict'

const Sequelize = require('sequelize')

module.exports.name = 'project'
module.exports.schema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  shortName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  externalLink: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  templateClass: {
    type: Sequelize.STRING,
    allowNull: false
  }
}
