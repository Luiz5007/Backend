const userModel = require('../infra/models/userModel')

module.exports = {
  async create({ email, password }) {
    try {
      const userCreated = await userModel.create({
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
      const users = await userModel.findAll({
        include: {
          association: 'biography',
          include: {
            association: 'techs',
            through: {
              attributes: [],
            },
          },
        },
      })
      return users
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(userId) {
    try {
      await userModel.destroy({
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
      await userModel.update(data, { where: { id: userId } })

      const user = await this.findById(userId)
      return user
    } catch (error) {
      throw new Error(error)
    }
  },

  async findByEmail(email) {
    try {
      const user = await userModel.findOne({ where: { email: email } })

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
      const user = userModel.findByPk(userId, {
        include: {
          association: 'biography',
          include: {
            association: 'techs',
            through: {
              attributes: [],
            },
          },
        },
      })

      return user
    } catch (error) {
      throw new Error(error)
    }
  },
}
