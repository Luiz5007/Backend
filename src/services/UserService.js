const UserRepository = require('../repositories/userRepository')
const UserModel = require('../infra/models/user')

module.exports = {
  // fazer o tratamento dos dados == regras de negocio
  async create({ email, password, confirmPassword }) {
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
    // validar email
    try {
      const responseRepository = await UserRepository.create(data)
      return responseRepository
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
      await UserRepository.delete(userId)
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(userId, { email, password, confirmPassword }) {
    const user = new UserModel()

    await user.validationEmail(email)
    await user.validationPassword(password, confirmPassword)

    const errors = await user.getErrors()

    if (errors.length > 0) {
      return { errors }
    }

    const hashPassword = await user.hashPassword(password)

    const data = {
      email,
      password: hashPassword,
    }

    try {
      const responseRepository = await UserRepository.update(userId, data)
      return { responseRepository }
    } catch (error) {
      throw new Error(error)
    }
  },
}
