const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')

class biographyHobby extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        biographyId: DataTypes.INTEGER,
        hobbyId: DataTypes.INTEGER,
        descr: DataTypes.STRING,
      },
      { sequelize, tableName: 'biographyhobby' },
    )
  }
}

module.exports = biographyHobby
