const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')

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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }

  async validationFullName(fullName) {
    if (fullName.length < 5) {
      await this.addErrors('Nome completo muito curto!')
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

    const errors = await this.getErrors()

    if (errors.length > 0) {
      return false
    }

    return true
  }

  // async validationBirthday()
}

module.exports = Biography
