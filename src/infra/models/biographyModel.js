const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')
// const hobbyModel = require('./hobbyModel')
const moment = require('moment')

class Biography extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        fullName: {
          type: DataTypes.STRING,
          field: 'full_name',
        },
        nickname: DataTypes.STRING,
        birthday: DataTypes.DATE,
        aboutYou: {
          type: DataTypes.TEXT,
          field: 'about_you',
        },
        userId: {
          type: DataTypes.INTEGER,
          field: 'user_id',
        },
      },
      { sequelize, tableName: 'biographies' },
    )
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    this.belongsToMany(models.Hobby, { through: models.BioHobby })
  }

  async validationFullName(fullName) {
    if (fullName.length < 5) {
      await this.addErrors('Nome completo muito curto!')
    }

    if (fullName.length > 255) {
      await this.addErrors(
        'Nome completo muito longo! Limite de 255 caracteres',
      )
    }
    const errors = await this.getErrors()

    if (errors.length > 0) {
      return false
    }

    return true
  }

  async validationNickname(nickname) {
    if (nickname.length < 2) {
      await this.addErrors('Apelido muito curto! Campo Opcional!')
    }

    if (nickname.length > 255) {
      await this.addErrors('Apelido muito longo! Limite de 255 caracteres')
    }
    const errors = await this.getErrors()

    if (errors.length > 0) {
      return false
    }

    return true
  }

  async validationAboutYou(aboutYou) {
    if (aboutYou.length < 2) {
      await this.addErrors('Descrição muito curta! Campo Opcional!')
    }

    if (aboutYou.length > 500) {
      await this.addErrors('Descrição muito longa! Limite de 500 caracteres')
    }
    const errors = await this.getErrors()

    if (errors.length > 0) {
      return false
    }

    return true
  }

  async validationBirthday(birthday) {
    const today = moment().format('YYYY-MM-DD')
    if (birthday >= today) {
      await this.addErrors('Data de nascimento inválida!')
    }

    const errors = await this.getErrors()

    if (errors.length > 0) {
      return false
    }

    return true
  }
}

module.exports = Biography
