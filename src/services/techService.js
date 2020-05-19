const techRepository = require('../repositories/techRepository')

module.exports = {
  async create(data) {
    try {
      // verificar se ja existe essa tech cadastrada,
      // => deixando name em lowCase pra verificar => criar metodo findByName
      const responseRepository = await techRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async index() {
    try {
      const responseRepository = await techRepository.index()
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(techId, data) {
    try {
      // verificar se existe essa tech cadastrada
      // verificar nome pra saber se ja nao é de outra tech

      const responseRepository = await techRepository.update(techId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(techId) {
    try {
      // verificar se existe essa tech cadastrada
      // retornar model pra verificar errors
      await techRepository.delete(techId)
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async findById(techId) {
    try {
      const tech = await techRepository.findById(techId)
      // verificar se a tech existe
      return tech
    } catch (error) {
      throw new Error(error)
    }
  },
}
