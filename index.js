/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug, saveNewVillains } = require('./controller/villains')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', bodyParser.json(), saveNewVillains)

app.listen(1341, () => {
  console.log('listening on port 1341...')
})
