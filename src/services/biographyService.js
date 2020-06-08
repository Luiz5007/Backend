const biographyRepository = require('../repositories/biographyRepository')
const userRepository = require('../repositories/userRepository')
const bioHobbyService = require('../services/bioHobbyService')
const BiographyModel = require('../infra/models/biographyModel')
const BiographyHobbyModel = require('../infra/models/biographyHobbyModel')

module.exports = {
  async create(userId, { fullName, nickname, birthday, aboutYou, hobbies }) {
    try {
      // primeiro validar os dados (identificar usuário existente)

      const biography = new BiographyModel()
      const bioHobby = new BiographyHobbyModel()

      // verificar duplicidades - não podem existir mais de uma biografia com o mesmo user_id
      if (await userRepository.findById(userId)) {
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

      const data = { userId }
      // Se o body contém nome completo, validar nome completo
      if (fullName) {
        if (await biography.validationFullName(fullName)) {
          data.fullName = fullName
        }
      } else {
        await biography.addErrors(
          'Preencha seu Nome Completo. Campo Obrigatório!',
        )
      }
      // Se o body contém apelido, validar apelido
      if (nickname) {
        if (await biography.validationNickname(nickname)) {
          data.nickname = nickname
        }
      }

      if (birthday) {
        if (await biography.validationBirthday(birthday)) {
          data.birthday = birthday
        }
      }

      if (aboutYou) {
        if (await biography.validationAboutYou(aboutYou)) {
          data.aboutYou = aboutYou
        }
      }
      // Se o body contém hobbies, validar hobbies
      if (hobbies) {
        if (await bioHobby.validationHobbies(hobbies)) {
          data.hobbies = hobbies
        }
      }
      // adicionar os erros de BioHobbyModel
      await biography.addErrors(await bioHobby.getErrors())
      // pegar os erros da BiographyModel
      const errors = await biography.getErrors()
      // se houver errros, retornar Model
      if (errors.length > 0) {
        return biography
      }
      // Após validado todos os campos do body, criar biography
      const responseRepository = await biographyRepository.create(data)
      // obter id da biography criada
      const bioId = responseRepository.id
      // criar hobbies com id desta biography
      await bioHobbyService.create(bioId, hobbies)
      // encontrar biography + hobbies do userId
      const bioPlusHobby = await biographyRepository.findById(userId, bioId)
      return bioPlusHobby
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(
    { fullName, nickname, birthday, aboutYou, hobbies },
    bioId,
    userId,
  ) {
    try {
      const biography = new BiographyModel()
      const bioHobby = new BiographyHobbyModel()
      // userId e bioId devem ser iguais aos relacionados no DB
      if (await userRepository.findById(userId)) {
        if (!(await biographyRepository.findById(userId, bioId))) {
          await biography.addErrors('Operação não autorizada!')
        }
      } else {
        await biography.addErrors(
          'Operação não autorizada! Usuário não existe!',
        )
      }
      // Se userId e bioId corretos, criar objeto dinâmico
      const data = {}
      // Se o body contém nome completo, validar nome completo
      if (fullName) {
        if (await biography.validationFullName(fullName)) {
          data.fullName = fullName
        }
      }

      if (nickname) {
        if (await biography.validationNickname(nickname)) {
          data.nickname = nickname
        }
      }

      if (birthday) {
        if (await biography.validationBirthday(birthday)) {
          data.birthday = birthday
        }
      }

      if (aboutYou) {
        if (await biography.validationAboutYou(aboutYou)) {
          data.aboutYou = aboutYou
        }
      }
      // Se o body contém hobbies, validar os hobbies
      if (hobbies) {
        if (await bioHobby.validationHobbies(hobbies)) {
          data.hobbies = hobbies
        }
      }
      // adicionar os erros da BioHobbyModel
      await biography.addErrors(await bioHobby.getErrors())
      // pegar os erros da BiographyModel
      const errors = await biography.getErrors()
      // se ouver erros, retornar Model
      if (errors.length > 0) {
        return biography
      }
      // atualizar biography
      await biographyRepository.update(data, bioId, userId)
      // atualizar hobbies
      await bioHobbyService.update(bioId, hobbies)
      // encontrar biography + hobbies do userId
      const bioPlusHobby = await biographyRepository.findById(userId, bioId)
      return bioPlusHobby
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(userId, bioId) {
    try {
      const biography = new BiographyModel()

      if (await userRepository.findById(userId)) {
        if (!(await biographyRepository.findById(userId, bioId))) {
          await biography.addErrors('Operação não autorizada!')
        }
      } else {
        await biography.addErrors(
          'Operação não autorizada! Usuário não existe!',
        )
      }

      const errors = await biography.getErrors()

      if (errors.length > 0) {
        return biography
      }

      await biographyRepository.delete(userId, bioId)
      return biography
    } catch (error) {
      throw new Error(error)
    }
  },
}
