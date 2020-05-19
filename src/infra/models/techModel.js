const { DataTypes } = require('sequelize')
const BaseModel = require('../models/baseModel')

class Tech extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      { sequelize, tableName: 'technologies' },
    )
  }
}

module.exports = Tech
