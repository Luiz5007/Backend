const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')
const UserModel = require('./userModel')

class Biography extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        full_name: DataTypes.STRING,
        nickiname: DataTypes.STRING,
        birthday: DataTypes.DATE,
        about_you: DataTypes.TEXT,
      },
      { sequelize, tableName: 'biographies' },
    )
  }
}

Biography.hasOne(UserModel, { foreignKey: 'user_id', as: 'users' })

module.exports = Biography
