const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('villainsDB', 'villainsUser', 'villainsPassword', {
  host: 'localhost', dialect: 'mysql',
})

const Villains = villainsModel(connection, Sequelize)

module.exports = { Villains }
