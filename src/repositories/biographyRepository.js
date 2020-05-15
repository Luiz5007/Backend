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

  async update(data, bioId, userId) {
    try {
      await biographyModel.update(data, {
        where: { id: bioId, userId },
      })
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(userId, bioId) {
    try {
      await biographyModel.destroy({
        where: { id: bioId, userId },
      })
    } catch (error) {
      throw new Error(error)
    }
  },

  async findByUserId(userId) {
    try {
      const biography = await biographyModel.findOne({ where: { userId } })
      return biography
    } catch (error) {
      throw new Error(error)
    }
  },
}
