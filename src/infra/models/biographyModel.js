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
    if (fullName.lenght < 5) {
      await this.addErrors('Nome completo muito curto!')
    }
    const errors = await this.getErrors()
    if (errors.length === 0) {
      return true
    } else {
      return false
    }
  }

  async validationNickname(nickname) {
    if (nickname.lenght < 2) {
      await this.addErrors('Apelido muito curto! Campo Opcional!')
    }
    const errors = await this.getErrors()
    if (errors.lenght === 0) {
      return true
    } else {
      return false
    }
  }

  // async validationBirthday()
}

module.exports = Biography
