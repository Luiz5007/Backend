const UserModel = require('../infra/models/user')

module.exports = {
  async create (data) {
    try {
      const userCreated = await UserModel.create(data)
      const user = await UserModel.findOne({ // ????
        where: { id: userCreated.id },
        attributes: { exclude: ['password'] }
      })
      return user
    } catch (error) {
      throw new Error(error)
    }
  },

  async index () {
    try {
      const users = await UserModel.findAll({
        attributes: { exclude: ['password'] }
      })
      return users
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete (userId) {
    try {
      await UserModel.destroy({
        where: { id: userId }
      })
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async update (userId, data) {
    try {
      await UserModel.update(
        data,
        { where: { id: userId } }
      )
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}
