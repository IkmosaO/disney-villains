const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const villainsData = await models.Villains.findAll()

    return response.send(villainsData)
  } catch (error) {
    return response.status(500).send('Unable to retrieve all villains, please try again')
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const pickedVillain = await models.Villains.findOne({ where: { slug }, attributes: ['name', 'movie', 'slug'], })

    return pickedVillain ? response.send(pickedVillain) : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve villain, please try again')
  }
}

const saveNewVillains = async (request, response) => {
  try {
    const { name, movie, slug } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('The following fields are required: name, movie, slug')
    }

    const newVillain = await models.Villains.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.status(500).send('Unable to save villain, please try again')
  }
}

module.exports = {
  getAllVillains,
  getVillainBySlug,
  saveNewVillains
}
