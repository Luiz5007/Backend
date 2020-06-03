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
    const [unstructured] = hobbies
    if (unstructured.id <= 0) {
      await this.addErrors(' Valor Inválido! Hobby Não existe!')
    }
    // verificar se um hobby existe com o id passado
    const find = await hobbyService.findById(unstructured.id)
    // se não tiver nenhum hobby com o id passado
    if (find.errors.length > 0) {
      await this.addErrors(find.errors)
      return BiographyHobby
    }
    // validar a descrição
    if (unstructured.descr) {
      if (unstructured.descr.length < 30) {
        await this.addErrors('Descrição muito curta! Ao mínimo 30 caracteres')
      }
      if (unstructured.descr.length > 255) {
        await this.addErrors('Descrição muito longa! No máximo 255 caracteres')
      }
      return unstructured
    } else {
      const [hobbyId] = unstructured.id
      return hobbyId
    }
  }
}

module.exports = BiographyHobby
