const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')
const HobbyModel = require('../models/hobbyModel')
const hobbyService = require('../../services/hobbyService')

class BiographyHobby extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        biographyId: DataTypes.INTEGER,
        hobbyId: DataTypes.INTEGER,
        descr: DataTypes.STRING,
      },
      { sequelize, tableName: 'biography_hobby' },
    )
  }

  static associate(models) {
    this.belongsToMany(models.Biography, {
      through: 'biography_hobby',
      foreignKey: 'id',
      as: 'biographies',
    })
  }

  async validationHobbies(hobbies) {
    const hobby = new HobbyModel()
    const [unstructured] = hobbies
    if (unstructured.id <= 0) {
      await this.addErrors(' Valor Inválido! Hobby Não existe!')
    }
    await hobbyService.findById(unstructured.id)

    console.log(await hobby.getErrors())
    const errors = [1, 2]
    if (errors.length > 0) {
      await this.addErrors('Hobby não Existe!')
    }

    return null
  }
}

module.exports = BiographyHobby
