const userRepository = require('../repositories/userRepository')
const UserModel = require('../infra/models/userModel')

module.exports = {
  // fazer o tratamento dos dados == regras de negocio
  async create({ email, password, confirmPassword }) {
    try {
      const user = new UserModel()

      await user.validationEmail(email)
      await user.validationPassword(password, confirmPassword)

      if (await userRepository.findByEmail(email)) {
        user.addErrors('Email ja existente no sistema!')
      }

      const errors = await user.getErrors()

      if (errors.length > 0) {
        return user
      }

      const hashPassword = await user.hashPassword(password)

      const data = {
        email,
        password: hashPassword,
      }

      const responseRepository = await userRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async findById(userId) {
    try {
      let user = await userRepository.findById(userId)

      if (!user) {
        user = new UserModel()
        user.addErrors('User not exist!')
      }

      return user
    } catch (error) {
      throw new Error(error)
    }
  },

  async index() {
    try {
      const responseRepository = await userRepository.index()
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(userId) {
    try {
      const user = new UserModel()

      if (!(await userRepository.findById(userId))) {
        await user.addErrors('User not exist!')
        return user
      }

      await userRepository.delete(userId)
      return user
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(userId, { email, password, confirmPassword }) {
    try {
      let user = await userRepository.findById(userId)

      if (!user) {
        user = new UserModel()
        await user.addErrors('User not exist!')
        return user
      }

      const data = {}

      if (email) {
        if (await user.validationEmail(email)) {
          if (
            (await userRepository.findByEmail(email)) &&
            email !== user.email
          ) {
            user.addErrors('Email ja existente no sistema!')
          } else {
            data.email = email
          }
        }
      }

      if (password && confirmPassword) {
        if (await user.validationPassword(password, confirmPassword)) {
          data.password = password
        }
      }

      const errors = await user.getErrors()

      if (errors.length > 0) {
        return user
      }

      data.password = await user.hashPassword(data.password)

      const responseRepository = await userRepository.update(userId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },
}
