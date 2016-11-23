'use strict'

const test = require('tape')
const testName = 'db.js'
const Database = require('../lib/db')
const db = new Database(':memory:')

db.on('open', () => runTests())

function runTests () {
  test(`${testName} can create all the tables`, t => {
    db.setupTables(function (err) {
      t.notOk(err, 'Create table function runs successfully.')

        const query = 'SELECT name FROM sqlite_master WHERE type=\'table\''
        db.all(query, (err, list) => {
          t.notOk(err, 'We can ask for a list of tables.')
          t.ok(list, 'We get back a list of tables.')

          const skillsTable = list.filter(table => table.name === 'skills')
          const projectsTable = list.filter(table => table.name === 'projects')
          t.ok(skillsTable, 'Skills table is in the list')
          t.ok(projectsTable, 'Projects table is in the list')
          t.end()
        })
    })
  })
}
