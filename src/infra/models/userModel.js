const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')
const bcrypt = require('bcrypt')

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

  static associate(models) {
    this.hasOne(models.Biography, { foreignKey: 'user_id', as: 'biography' })
  }

  async validationEmail(email) {
    const response = email.search('@stefanini.com')

    if (response === -1) {
      await this.addErrors(
        'Email Inválido! Email deve conter domínio @stefanini.com',
      )
    }

    const errors = await this.getErrors()

    if (errors.length > 0) {
      return false
    }

    return true
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

    const errors = await this.getErrors()

    if (errors.length > 0) {
      return false
    }

    return true
  }

  async hashPassword(password) {
    const saltRounds = 10

    return await bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        return hash
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}

module.exports = User
