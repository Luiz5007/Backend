const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')

class User extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      { sequelize, tableName: 'users' },
    )
  }

  async validationEmail(email) {
    const response = email.search('@stefanini.com')

    if (response === -1) {
      await this.addErrors(
        'Email Inválido! Email deve conter domínio @stefanini.com',
      )
    }
  }

  async validationPassword(password, confirmPassword) {
    if (password.length < 6) {
      await this.addErrors(
        'Senha Inválida! Senha deve ser maior que 6 caracteres!',
      )
    }

    if (password !== confirmPassword) {
      await this.addErrors('Senhas diferentes!')
    }
  }
}

module.exports = User
