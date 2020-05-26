const { DataTypes } = require('sequelize')
const BaseModel = require('../models/baseModel')

class Tech extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      { sequelize, tableName: 'techs' },
    )
  }

  static associate(models) {
    this.belongsToMany(models.Biography, {
      through: 'bio_tech',
      foreignKey: 'tech_id',
      as: 'biographies',
    })
  }

  async validationName(name) {
    if (name.length === 0) {
      await this.addErrors('Nome da tech inválido!')
    }

    const errors = await this.getErrors()

    if (errors.length > 0) {
      return false
    }

    return true
  }

  async putNameInPattern(name) {
    const nameInPattern = name.replace(/[\s]/g, '').toUpperCase()

    return nameInPattern
  }
}

module.exports = Tech
