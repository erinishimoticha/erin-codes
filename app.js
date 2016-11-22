'use strict'

const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 8888

app.use('/', express.static(path.join(__dirname, 'assets')))
app.listen(port, () => console.log(`Listening on ${port}.`))
