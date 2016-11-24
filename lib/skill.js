'use strict'

const Sequelize = require('sequelize')

module.exports.name = 'skill'
module.exports.schema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  icon: {
    type: Sequelize.STRING,
    allowNull: false
  },
  row: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: 'rowSideIndex'
  },
  side: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: 'rowSideIndex'
  }
}
