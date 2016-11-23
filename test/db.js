'use strict'

const test = require('tape')
const testName = 'db.js'
const Database = require('../lib/db')
const db = new Database(':memory:')

db.on('open', () => runTests())

function runTests () {
  test(`${testName} the setupTables method`, t => {
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

  test(`${testName} the insertSkills method with valid params`, t => {
    db.insertSkill({
      name: 'Languages',
      desc: 'Node.js, JavaScript, Python, Perl, Java. Familiar with Ruby, Bash, C.',
      icon: 'fa-code',
      row: 0,
      side: 0
    }, err => {
      t.notOk(err, 'We can insert a set of skills')
      t.end()
    })
  })

  test(`${testName} the insertSkills method with missing params`, t => {
    db.insertSkill({
      name: 'Languages',
      desc: 'Node.js, JavaScript, Python, Perl, Java. Familiar with Ruby, Bash, C.',
      icon: 'fa-code',
      side: 0
    }, err => {
      t.ok(err, 'We get an error.')
      t.end()
    })
  })

  test(`${testName} the insertSkills method with invalid string param`, t => {
    db.insertSkill({
      name: 'Languages',
      desc: 10,
      icon: 'fa-code',
      row: 0,
      side: 0
    }, err => {
      t.ok(err, 'We get an error.')
      t.end()
    })
  })

  test(`${testName} the insertSkills method with invalid number param`, t => {
    db.insertSkill({
      name: 'Languages',
      desc: 'Node.js, JavaScript, Python, Perl, Java. Familiar with Ruby, Bash, C.',
      icon: 'fa-code',
      row: 'wrong',
      side: 0
    }, err => {
      t.ok(err, 'We get an error.')
      t.end()
    })
  })

  test(`${testName} the listSkills`, t => {
    db.listSkills((err, skills) => {
      t.notOk(err, 'No error is returned.')
      t.ok(skills, 'We can retreive a list of skills.')
      t.ok(skills[0], 'The list has entries in it.')
      t.end()
    })
  })
}
