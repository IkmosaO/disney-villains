/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
// const villains = require('./villains')
const { getAllVillains, getVillainBySlug, saveNewVillains } = require('./controller/villains')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', bodyParser.json(), saveNewVillains)

app.listen(1337, () => {
  console.log('listening on port 1337...')
})
