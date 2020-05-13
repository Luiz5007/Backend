const biographyRepository = require('../repositories/biographyRepository')

module.exports = {
  async create(userId, { fullName, nickname, birthday, aboutYou }) {
    try {
      // primeiro validar os dados (identificar usuário existente)
      // verificar duplicidades - não podem existir mais de uma biografia com o mesmo user_id
      const data = { userId, fullName, nickname, birthday, aboutYou }
      const responseRepository = await biographyRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(data, bioId, userId) {
    try {
      await biographyRepository.update(data, bioId)
      return
    } catch (error) {
      throw new Error(error)
    }
  },
}
