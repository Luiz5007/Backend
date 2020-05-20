const hobbyModel = require('../infra/models/hobbyModel')

module.exports = {
  async create({ name }) {
    try {
      const hobbyCreated = await hobbyModel.create({ name: name }) // erro aqui
      return hobbyCreated
    } catch (error) {
      throw new Error(error)
    }
  },
  async index() {
    try {
      const hobbies = await hobbyModel.findAll()
      return hobbies
    } catch (error) {
      throw new Error(error)
    }
  },
  async update(id, data) {
    try {
      await hobbyModel.update(data, { where: { id } })
      const hobby = await this.findById(id)
      return hobby
    } catch (error) {
      throw new Error(error)
    }
  },
  async delete(id) {
    try {
      await hobbyModel.destroy({ where: { id: id } })
    } catch (error) {
      throw new Error(error)
    }
  },
  async findName(name) {
    const hobby = await hobbyModel.findOne({ where: { name } })
    return hobby
  },
  async findById(id) {
    const hobby = await hobbyModel.findByPk(id)
    return hobby
  },
}
