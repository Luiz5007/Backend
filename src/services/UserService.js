const UserRepository = require('../repositories/UserRepository')

module.exports = { // fazer o tratamento dos dados == regras de negocio
  async create ({ email, password, confirmPassword }) {
    // futuramente
    // recurso pra validar dominio stefanini
    // confirmar password
    // verificar se o password tem mais 6 caracters

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

  async update (userId, data) {
    try {
      const responseRepository = UserRepository.update(userId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }
}
