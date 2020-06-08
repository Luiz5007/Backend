const bioHobbyModel = require('../infra/models/biographyHobbyModel')

module.exports = {
  async create(data) {
    try {
      const bioHobby = await bioHobbyModel.create(data)
      return bioHobby
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(bioId, data) {
    try {
      const hobbyId = data.hobbyId
      var bioHobby = await bioHobbyModel.findOne({
        where: { biographyId: bioId, hobbyId },
      })
      if (bioHobby) {
        bioHobby = await bioHobbyModel.update(data, {
          where: { biographyId: bioId, hobbyId },
        })
      } else {
        bioHobby = await bioHobbyModel.create(data)
      }
      return bioHobby
    } catch (error) {
      throw new Error(error)
    }
  },
}
