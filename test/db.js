'use strict'

const test = require('tape')
const testName = 'db.js'
const Database = require('../lib/db')
const db = new Database(':memory:')
const uuid = require('uuid')
const async = require('async')

db.on('ready', () => reset(runTests))
db.on('error', err => console.error(err))

function runTests () {
  test(`${testName} the insertSkill method with valid params`, t => {
    const skill = newSkill()

    db.insertSkill(skill, err => {
      t.notOk(err, 'We can insert a set of skills')

      db.Skill.findOne({ name: skill.name })
        .then(res => {
          t.equals(res.name, skill.name, 'Name is set properly')
          t.equals(res.desc, skill.desc, 'Description is set properly')
          t.equals(res.icon, skill.icon, 'Icon is set properly')
          t.equals(res.row, skill.row, 'Row is set properly')
          t.equals(res.side, skill.side, 'Side is set properly')
          reset(t.end)
        })
        .catch(err => setImmediate(() => reset(t.end, err)))
    })
  })

  test(`${testName} the insertSkill method with missing params`, t => {
    const skill = newSkill()
    delete skill.icon

    db.insertSkill(skill, err => {
      t.ok(err, 'We get an error.')
      reset(t.end)
    })
  })

  test(`${testName} the insertSkill method with invalid string param`, t => {
    const skill = newSkill()
    skill.desc = 10

    db.insertSkill(skill, err => {
      t.ok(err, 'We get an error.')
      reset(t.end)
    })
  })

  test(`${testName} the insertSkill method with invalid number param`, t => {
    const skill = newSkill()
    skill.row = 'wrong'

    db.insertSkill(skill, err => {
      t.ok(err, 'We get an error.')
      reset(t.end)
    })
  })

  test(`${testName} the listSkills method`, t => {
    async.parallel([
      cb => db.insertSkill(newSkill(), cb),
      cb => db.insertSkill(newSkill(), cb),
      cb => db.insertSkill(newSkill(), cb)
    ], err => {
      t.notOk(err, 'No error is returned.')

      db.listSkills((err, skills) => {
        t.notOk(err, 'No error is returned.')
        t.ok(skills, 'We can retreive a list of skills.')
        t.equal(skills.length, 3, 'We get 3')
        t.ok(skills[0], 'The list has entries in it.')
        t.ok(skills[0].name, 'The skill has a name.')
        t.ok(skills[0].desc, 'The skill has a desc.')
        t.ok(skills[0].icon, 'The skill has a icon.')
        t.notEqual(skills[0].row, undefined, 'The skill has a row.')
        t.notEqual(skills[0].side, undefined, 'The skill has a side.')
        reset(t.end)
      })
    })
  })

  test(`${testName} the destroySkill method with valid params`, t => {
    const skill = newSkill()
    db.insertSkill(skill, err => {
      t.notOk(err, 'We can insert a skill')

      db.destroySkill({ name: skill.name }, err => {
        t.notOk(err, 'We can destroy the skill')

        db.listSkills((err, list) => {
          t.notOk(err, 'We can list the skills.')
          const found = list.find(item => item.name === skill.name)
          t.notOk(found, 'The deleted skill is not in the list.')
          reset(t.end)
        })
      })
    })
  })

  test(`${testName} the insertProject method with valid params`, t => {
    const project = newProject()
    db.insertProject(project, err => {
      t.notOk(err, 'We can insert a project')
      reset(t.end)
    })
  })

  test(`${testName} the listProjects method`, t => {
    async.parallel([
      cb => db.insertProject(newProject(), cb),
      cb => db.insertProject(newProject(), cb),
      cb => db.insertProject(newProject(), cb)
    ], err => {
      t.notOk(err, 'No error is returned.')

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
        reset(t.end)
      })
    })
  })

  test(`${testName} the destroyProject method with valid params`, t => {
    const project = newProject()
    db.insertProject(project, err => {
      t.notOk(err, 'We can insert a project')

      db.destroyProject({ name: project.name }, err => {
        t.notOk(err, 'We can destroy the project')

        db.listProjects((err, list) => {
          t.notOk(err, 'We can list the projects.')
          const found = list.find(item => item.name === project.name)
          t.notOk(found, 'The deleted project is not in the list.')
          reset(t.end)
        })
      })
    })
  })
}

const newSkill = (function () {
  let row = 0
  let side = 0

  return function () {
    const item = {
      name: uuid.v4(),
      desc: uuid.v4(),
      icon: 'fa-code',
      row: row,
      side: side
    }

    row++
    side++

    return item
  }
})()

const newProject = (function () {
  return function () {
    const item = {
      externalLink: uuid.v4(),
      type: uuid.v4(),
      name: uuid.v4(),
      shortName: uuid.v4(),
      image: uuid.v4(),
      date: uuid.v4(),
      templateClass: uuid.v4()
    }

    return item
  }
})()

function reset (resetCb, err) {
  async.parallel([
    cb => {
      db.Skill.truncate()
        .then(() => setImmediate(() => cb()))
        .catch(err => setImmediate(() => cb(err)))
    },
    cb => {
      db.Project.truncate()
        .then(() => setImmediate(() => cb()))
        .catch(err => setImmediate(() => cb(err)))
    }
  ], err2 => resetCb(err || err2))
}
