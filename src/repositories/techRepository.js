const techModel = require('../infra/models/techModel')

module.exports = {
  async create(data) {
    try {
      const tech = await techModel.create(data)
      return tech
    } catch (error) {
      throw new Error(error)
    }
  },

  async index() {
    try {
      const techlonogies = await techModel.findAll()
      return techlonogies
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(techId, data) {
    try {
      await techModel.update(data, { where: { id: techId } })
      const tech = await this.findById(techId)
      return tech
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(techId) {
    try {
      await techModel.destroy({ where: { id: techId } })
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async findById(techId) {
    try {
      const tech = await techModel.findByPk(techId)
      return tech
    } catch (error) {
      throw new Error(error)
    }
  },
}
