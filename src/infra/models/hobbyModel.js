const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')

class Hobby extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      { sequelize, tableName: 'hobbies' },
    )
  }

  static associate(models) {
    this.belongsToMany(models.Biography, {
      foreignKey: 'bioId',
      through: 'bio_hobby',
      as: 'biographies',
    })
  }

  async onlyString(name) {
    const data = {}
    data.name = name.search(/[0-9]/)
    if (data.name !== -1) {
      return name
    } else {
      return null
    }
  }

  async putInPattern(name) {
    const inPattern = { name: name.toUpperCase() }
    return inPattern
  }
}

module.exports = Hobby
