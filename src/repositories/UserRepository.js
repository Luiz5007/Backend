const UserModel = require('../infra/models/userModel')

module.exports = {
  async create({ email, password }) {
    try {
      const userCreated = await UserModel.create({
        email: email,
        password: password,
      })
      const user = await this.findById(userCreated.id)
      return user
    } catch (error) {
      throw new Error(error)
    }
  },

  async index() {
    try {
      const users = await UserModel.findAll({
        attributes: { exclude: ['password'] },
      })
      return users
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(userId) {
    try {
      await UserModel.destroy({
        where: {
          id: userId,
        },
      })
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(userId, data) {
    try {
      await UserModel.update(data, { where: { id: userId } })

      const user = await this.findById(userId)
      return user
    } catch (error) {
      throw new Error(error)
    }
  },

  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ where: { email: email } })

      if (user) {
        return true
      }

      return false
    } catch (error) {
      throw new Error(error)
    }
  },

  async findById(userId) {
    try {
      const user = UserModel.findByPk(userId, {
        attributes: {
          exclude: 'password',
        },
      })

      return user
    } catch (error) {
      throw new Error(error)
    }
  },
}
