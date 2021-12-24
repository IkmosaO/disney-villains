/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { allVillains, singleVillain, postedVillain, createdVillain } = require('../mocks/villains')
const { getAllVillains, getVillainBySlug, saveNewVillains } = require('../../controller/villains')

chai.use(sinonChai)
const { expect } = chai

describe('controllers - villains', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Villains, 'findAll')
    stubbedFindOne = sandbox.stub(models.Villains, 'findOne')
    stubbedCreate = sandbox.stub(models.Villains, 'create')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })
  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(allVillains)

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(allVillains)
    })
    it('returns a 500 status when an error occurs retrieving all the villains', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve all villains, please try again')
    })
  })
  describe('getVillainBySlug', () => {
    it('retrieves the villain associated with the provided slug from the database and calls response.send() with it', async () => {
      const request = { params: { slug: 'captain-hook' } }

      stubbedFindOne.returns(singleVillain)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'captain-hook' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })

    it('returns a 404 status when no villain is found', async () => {
      const request = { params: { slug: 'captain-hook' } }

      stubbedFindOne.returns(null)

      await getVillainBySlug(request, response)

      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 status when an error occurs retrieving the villain by id', async () => {
      const request = { params: { slug: 'captain-hook' } }

      stubbedFindOne.throws('ERROR!')

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'captain-hook' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve villain, please try again')
    })
  })
  describe('saveNewVillains', () => {
    it('accepts new villain details and saves them as a new villain in the database, returning the saved data with a 201 status', async () => {
      const request = { body: postedVillain }

      stubbedCreate.returns(createdVillain)

      await saveNewVillains(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(createdVillain)
    })

    it('returns a 400 status when not all required fields are provided (missing location)', async () => {
      const { name, movie } = postedVillain // WHY DOES THIS NEED TO BE MISSING A KEY? isnt postedVILLIAN BEING PULLED IN??
      const request = { body: { name, movie } }

      await saveNewVillains(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('The following fields are required: name, movie, slug')
    })

    it('returns a 500 status when an error occurs saving the new villain', async () => {
      const request = { body: postedVillain }

      stubbedCreate.throws('ERROR!')

      await saveNewVillains(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save villain, please try again')
    })
  })
})
