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
      t.ok(skills[0].name, 'The skill has a name.')
      t.ok(skills[0].desc, 'The skill has a desc.')
      t.ok(skills[0].icon, 'The skill has a icon.')
      t.notEqual(skills[0].row, undefined, 'The skill has a row.')
      t.notEqual(skills[0].side, undefined, 'The skill has a side.')
      t.end()
    })
  })

  test(`${testName} the insertProject method with valid params`, t => {
    db.insertProject({
      externalLink: 'https://nodesource.com/products/nsolid',
      type: 'external-link',
      name: 'N|Solid Node.js Runtime',
      shortName: 'N|Solid',
      image: 'images/portfolio/nsolid.png',
      date: 'June 2016 - Present',
      templateClass: 'development'
    }, err => {
      t.notOk(err, 'We can insert a project')
      t.end()
    })
  })

  test(`${testName} the listProjects`, t => {
    db.listProjects((err, projects) => {
      t.notOk(err, 'No error is returned.')
      t.ok(projects, 'We can retreive a list of projects.')
      t.ok(projects[0], 'The list has entries in it.')
      t.ok(projects[0].externalLink, 'The project has a externalLink.')
      t.ok(projects[0].type, 'The project has a type.')
      t.ok(projects[0].name, 'The project has a name.')
      t.ok(projects[0].shortName, 'The project has a shortName.')
      t.ok(projects[0].image, 'The project has a image.')
      t.ok(projects[0].date, 'The project has a date.')
      t.ok(projects[0].templateClass, 'The project has a templateClass.')
      t.end()
    })
  })
}
