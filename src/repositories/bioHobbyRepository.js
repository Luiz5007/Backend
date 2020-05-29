const bioHobbyModel = require('../infra/models/biographyhobby')

module.exports = {
  async create(bioHobbyDescr) {
    try {
      const bioHobby = await bioHobbyModel.create(bioHobbyDescr)
      return bioHobby
    } catch (error) {}
  },
}
