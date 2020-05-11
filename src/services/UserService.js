const UserRepository = require('../repositories/userRepository')
const UserModel = require('../infra/models/user')

module.exports = {
  // fazer o tratamento dos dados == regras de negocio
  async create({ email, password, confirmPassword }) {
    try {
      const user = new UserModel()

      await user.validationEmail(email)
      await user.validationPassword(password, confirmPassword)

      if (await UserRepository.findByEmail(email)) {
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

      const responseRepository = await UserRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async findById(userId) {
    try {
      let user = await UserRepository.findById(userId)

      if (user) {
        return user
      } else {
        user = new UserModel()
        user.addErrors('User not exist!')
        return user
      }
    } catch (error) {
      throw new Error(error)
    }
  },

  async index() {
    try {
      const responseRepository = await UserRepository.index()
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(userId) {
    try {
      let user = await UserRepository.findById(userId)

      if (user) {
        await UserRepository.delete(userId)
        user = new UserModel()
        return user
      } else {
        user = new UserModel()
        await user.addErrors('User not exist!')
        return user
      }
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(userId, { email, password, confirmPassword }) {
    try {
      let user = await UserRepository.findById(userId)

      if (user) {
        const data = {}

        if (email) {
          if (await user.validationEmail(email)) {
            if (
              (await UserRepository.findByEmail(email)) &&
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

        const responseRepository = await UserRepository.update(userId, data)
        return responseRepository
      } else {
        user = new UserModel()
        await user.addErrors('User not exist!')
        return user
      }
    } catch (error) {
      throw new Error(error)
    }
  },
}
