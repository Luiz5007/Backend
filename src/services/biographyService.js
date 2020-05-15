const biographyRepository = require('../repositories/biographyRepository')
const userRepository = require('../repositories/UserRepository')
const BiographyModel = require('../infra/models/biographyModel')

module.exports = {
  async create(userId, { fullName, nickname, birthday, aboutYou }) {
    try {
      // primeiro validar os dados (identificar usuário existente)
      const biography = new BiographyModel()
      // console.log(biography)

      const user = await userRepository.findById(userId)

      if (user) {
        if (await biographyRepository.findByUserId(userId)) {
          await biography.addErrors(
            'Este usuário já tem uma Biografia cadastrada!',
          )
          return biography
        }
      } else {
        await biography.addErrors('Este usuário não existe!')
        return biography
      }
      // verificar duplicidades - não podem existir mais de uma biografia com o mesmo user_id

      const data = { userId }

      if (fullName) {
        if (await biography.validationFullName(fullName)) {
          data.fullName = fullName
        }
      } else {
        await biography.addErrors(
          'Preencha seu Nome Completo. Campo Obrigatório!',
        )
      }

      if (nickname) {
        if (await biography.validationNickname(nickname)) {
          data.nickname = nickname
        }
      }

      const errors = await biography.getErrors()

      if (errors.length > 0) {
        return biography
      }

      const responseRepository = await biographyRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(data, bioId, userId) {
    try {
      await biographyRepository.update(data, bioId, userId)
      return
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(userId, bioId) {
    try {
      await biographyRepository.delete(userId, bioId)
      return
    } catch (error) {
      throw new Error(error)
    }
  },
}
