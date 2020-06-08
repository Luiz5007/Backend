const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')
const hobbyService = require('../../services/hobbyService')

class BiographyHobby extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        biographyId: DataTypes.INTEGER,
        hobbyId: DataTypes.INTEGER,
        descr: DataTypes.STRING,
      },
      { sequelize, tableName: 'bio_hobby' },
    )
  }

  static associate(models) {
    this.belongsToMany(models.Biography, {
      through: 'bio_hobby',
      foreignKey: 'id',
      as: 'biographies',
    })
  }

  async validationHobbies(hobbies) {
    var i = 0
    var unstructured = []

    for (i in hobbies) {
      unstructured[i] = hobbies[i]

      if (unstructured[i].id <= 0) {
        await this.addErrors(
          'Id #(' + unstructured[i].id + ') Inválido! Hobby Não existe!',
        )
        return null
      }

      const find = await hobbyService
        .findById(unstructured[i].id)
        .catch((error) => {
          console.log(error)
        })

      if (find && find.errors.length > 0) {
        await this.addErrors(find.errors)
        return BiographyHobby
      }

      // validar a descrição
      if (unstructured[i].descr) {
        if (unstructured[i].descr.length > 255) {
          await this.addErrors(
            'Descrição muito longa! No máximo 255 caracteres',
          )
        }
      } else {
        unstructured[i].id = hobbies[i].id
      }
    }
    return unstructured
  }
}

module.exports = BiographyHobby
