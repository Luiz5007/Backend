const biographyModel = require('../infra/models/biographyModel')

module.exports = {
  async create(data) {
    try {
      const biography = await BiographyModel.create(data)
      return biography
    } catch (error) {
      throw new Error(error)
    }
  },
}
