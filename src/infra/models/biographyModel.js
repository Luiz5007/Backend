const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')

class Biography extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        full_name: DataTypes.STRING,
        nickname: DataTypes.STRING,
        birthday: DataTypes.DATE,
        about_you: DataTypes.TEXT,
      },
      { sequelize, tableName: 'biographies' },
    )
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Biography
