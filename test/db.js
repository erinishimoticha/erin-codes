'use strict'

const test = require('tape')
const testName = 'db.js'
const Database = require('../lib/db')
const db = new Database(':memory:')

db.on('open', () => runTests())

function runTests () {
  test(`${testName} can create the skills table`, t => {
    db.setupTables(function (err) {
      t.notOk(err, 'Create table function runs successfully.')

        db.all('SELECT name FROM sqlite_master WHERE type=\'table\'', function (err, list) {
          t.notOk(err, 'We can ask for a list of tables.')
          t.ok(list, 'We get back a list of tables.')
          t.equals(list[0].name, 'skills', 'Skills table is in the list')
          t.end()
        })
    })
  })
}
