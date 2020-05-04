const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init (sequelize) {
    super.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, { sequelize })
  }
}

// validationEmail
// validationPassword
User.prototype.validationEmail = (email) => {
  const response = email.search('@stefanini.com')

  if (response !== -1) {
    return true
  } else {
    return false
  }
}

User.prototype.validationPassword = (password, confirmPassword) => {
  let equalPasswords = false
  let lengthPassword = false

  if (password.length > 5) {
    lengthPassword = true
  } else {
    lengthPassword = false
  }

  if (password === confirmPassword) {
    equalPasswords = true
  } else {
    equalPasswords = false
  }

  return { equalPasswords, lengthPassword }
}

module.exports = User
