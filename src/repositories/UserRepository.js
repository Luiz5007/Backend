const UserModel = require('../infra/models/User')

module.exports = {
  async create (data) {
    try {
      const user = await UserModel.create(data)// falta exclude no password
      return user
    } catch (error) {
      throw new Error(error)
    }
  },

  async index () {
    try {
      const users = await UserModel.findAll({
        attributes: { exclude: ['password'] }// nao mostra passwords
      })
      return users
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete (userId) {
    try {
      await UserModel.destroy({
        where: { id: userId } // tratar no caso de tentar excluir um q ja foi excluido
      })
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async update (userId, data) {
    try {
      const response = UserModel.update( // tratar no caso de fazer update em um user deletado
        data,
        { where: { id: userId } }
      )
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
