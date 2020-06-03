const bioHobbyModel = require('../infra/models/biographyHobbyModel')

module.exports = {
  async create(bioHobbyDescr) {
    try {
      const bioHobby = await bioHobbyModel.create(bioHobbyDescr)
      return bioHobby
    } catch (error) {
      throw new Error(error)
    }
  },
}
