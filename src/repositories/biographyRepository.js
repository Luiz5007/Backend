const biographyModel = require('../infra/models/biographyModel')

module.exports = {
  async create(data) {
    try {
      const biography = await biographyModel.create(data)
      return biography
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(data, bioId) {
    try {
      await biographyModel.update(data, {
        where: { id: bioId },
      })
      return
    } catch (error) {
      throw new Error(error)
    }
  },
}
