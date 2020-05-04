const UserRepository = require('../repositories/userRepository')
const UserModel = require('../infra/models/user')

module.exports = { // fazer o tratamento dos dados == regras de negocio
  async create ({ email, password, confirmPassword }) {
    const errors = []
    const user = new UserModel()

    if (!user.validationEmail(email)) {
      errors.push('Email Inválido! Email deve conter domínio @stefanini.com')
    }

    if (!user.validationPassword(password, confirmPassword).lengthPassword) {
      errors.push('Senha Inválida! Senha deve ser maior que 6 caracteres!')
    }

    if (!user.validationPassword(password, confirmPassword).equalPasswords) {
      errors.push('Senhas diferentes!')
    }

    if (errors.length > 0) {
      return errors
    }

    const data = {
      email,
      password
    }

    try {
      const responseRepository = await UserRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async index () {
    try {
      const responseRepository = await UserRepository.index()
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete (userId) {
    try {
      await UserRepository.delete(userId)
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async update (userId, { email, password, confirmPassword }) {
    // fazer tratamento dos dados aqui tbm
    const data = {
      email,
      password
    }

    try {
      await UserRepository.update(userId, data)
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}
