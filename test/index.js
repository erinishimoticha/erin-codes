'use strict'

process.env.DB_DIALECT = process.env.DB_DIALECT || 'sqlite'
require('./db.js')
