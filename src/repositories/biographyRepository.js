const biographyModel = require('../infra/models/biographyModel')
const hobbiesModel = require('../infra/models/hobbiesModel')

module.exports = {
  async create({ hobbies, ...data }) {
    try {
      const biography = await biographyModel.create(data)
      await biography.addHobbies(hobbies, { through: hobbiesModel.hobbyId })
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

      const biography = await this.findById(userId, bioId)
      return biography
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

  async findById(userId, bioId) {
    try {
      const biography = await biographyModel.findOne({
        where: { id: bioId, userId },
      })
      return biography
    } catch (error) {
      throw new Error(error)
    }
  },
}
