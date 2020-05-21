const hobbyRepository = require('../repositories/hobbyRepository')
const HobbyModel = require('../infra/models/hobbyModel')

module.exports = {
  async create({ name }) {
    try {
      const hobby = new HobbyModel()
      // primeiro validar os dados
      if (await hobby.onlyString(name)) {
        await hobby.addErrors('Digite apenas letras!')
        return hobby
      }

      if (await hobbyRepository.findName(name)) {
        await hobby.addErrors('Hobby já cadastrado!')
        return hobby
      }
      const data = await hobby.putInPattern(name) // alterar para UpperCase
      const errors = await hobby.getErrors()

      if (errors.length > 0) {
        return hobby
      }

      const responseRepository = await hobbyRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },
  async index() {
    try {
      const responseRepository = await hobbyRepository.index()
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },
  async update(id, { name }) {
    try {
      const hobby = new HobbyModel()
      if (!(await hobbyRepository.findById(id))) {
        await hobby.addErrors('User not exist!')
        return hobby
      }

      if (await hobby.onlyString(name)) {
        await hobby.addErrors('Digite apenas letras!')
        return hobby
      }

      if (await hobbyRepository.findName(name)) {
        await hobby.addErrors('Hobby já cadastrado!')
      }
      const errors = await hobby.getErrors()

      if (errors.length > 0) {
        return hobby
      }

      const data = await hobby.putInPattern(name)
      const responseRepository = await hobbyRepository.update(id, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },
  async delete(id) {
    try {
      const hobby = new HobbyModel()

      if (!(await hobbyRepository.findById(id))) {
        await hobby.addErrors('User not exist!')
        return hobby
      }
      await hobbyRepository.delete(id)
      return hobby
    } catch (error) {
      throw new Error(error)
    }
  },

  async findById(id) {
    try {
      const hobby = new HobbyModel()

      if (!(await hobbyRepository.findById(id))) {
        await hobby.addErrors('User not exist!')
        return hobby
      }

      const responseRepository = await hobbyRepository.findById(id)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },
}
