const { Model, DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      { sequelize },
    )
  }

  async validationEmail(email) {
    const response = email.search('@stefanini.com')

    if (response === -1) {
      await this.base.addErrors(
        'Email Inválido! Email deve conter domínio @stefanini.com',
      )
    }
  }

  async validationPassword(password, confirmPassword) {
    if (password.length < 6) {
      await this.base.addErrors(
        'Senha Inválida! Senha deve ser maior que 6 caracteres!',
      )
    }

    if (password !== confirmPassword) {
      await this.base.addErrors('Senhas diferentes!')
    }
  }
}

User.prototype.base = BaseModel

module.exports = User
