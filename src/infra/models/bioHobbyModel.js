const { DataType } = require('sequelize')
const BaseModel = require('./baseModel')

class BioHobby extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        biographyId: {
          type: DataType.INTEGER,
          field: 'bio_id',
        },
        hobbyId: {
          type: DataType.INTEGER,
          field: 'hobby_id',
        },
        descr: DataType.STRING,
      },
      { sequelize, tableName: 'bio_hobby' },
    )
  }
}
