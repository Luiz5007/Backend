const biographyRepository = require('../repositories/biographyRepository')
const userRepository = require('../repositories/userRepository')
const BiographyModel = require('../infra/models/biographyModel')
const TechModel = require('../infra/models/techModel')
const techRepository = require('../repositories/techRepository')

module.exports = {
  async create(userId, { fullName, nickname, birthday, aboutYou, techs }) {
    try {
      const biography = new BiographyModel()

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

      if (techs) {
        if (Array.isArray(techs)) {
          if (techs.length > 0) {
            const tech = new TechModel()
            for (const techId of techs) {
              if (techId <= 0) {
                await tech.addErrors(`Tech de id ${techId} é inválida`)
              } else {
                const techFinded = await techRepository.findById(techId)

                if (!techFinded) {
                  await tech.addErrors(`Tech de id ${techId} não existe`)
                }
              }
            }

            const techErrors = await tech.getErrors()
            if (techErrors.length > 0) {
              await biography.addErrors(techErrors)
            } else {
              data.techs = techs
            }
          }
        } else {
          await biography.addErrors('Techs Inválidas!')
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

  async update(
    { fullName, nickname, birthday, aboutYou, techs },
    bioId,
    userId,
  ) {
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

      const data = {}

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

      if (techs) {
        if (Array.isArray(techs)) {
          if (techs.length > 0) {
            const tech = new TechModel()
            for (const techId of techs) {
              if (techId <= 0) {
                await tech.addErrors(`Tech de id ${techId} é inválida`)
              } else {
                const techFinded = await techRepository.findById(techId)

                if (!techFinded) {
                  await tech.addErrors(`Tech de id ${techId} não existe`)
                }
              }
            }

            const techErrors = await tech.getErrors()
            if (techErrors.length > 0) {
              await biography.addErrors(techErrors)
            } else {
              data.techs = techs
            }
          } else {
            data.techs = []
          }
        } else {
          await biography.addErrors('Techs Inválidas!')
        }
      }

      const errors = await biography.getErrors()

      if (errors.length > 0) {
        return biography
      }

      const responseRepository = await biographyRepository.update(
        data,
        bioId,
        userId,
      )

      return responseRepository
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
