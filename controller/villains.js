const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const villainsData = await models.Villains.findAll()

    return response.send(villainsData)
  } catch (error) {
    return response.status(500).send('Unable to retrieve team list, try again')
  }
}

const getVillainBySlug = async (request, response) => {
  const { slug } = request.params

  const foundVillain = await models.Villains.findOne({ where: { slug: slug } })


  return foundVillain ? response.send(foundVillain) : response.sendStatus(404)
}

const saveNewVillains = async (request, response) => {

}

module.exports = {
  getAllVillains,
  getVillainBySlug,
  saveNewVillains
}
