const { DataTypes } = require('sequelize')
const BaseModel = require('./baseModel')

class Hobbies extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        bioId: {
          type: DataTypes.INTEGER,
          field: 'bio_id',
        },
        hobbyId: {
          type: DataTypes.INTEGER,
          field: 'hobby_id',
        },
        desc: DataTypes.STRING,
      },
      { sequelize, tableName: 'bio_hobby' },
    )
  }

  async parseHobbies(hobbies) {
    var parsedHobbies = hobbies
    parsedHobbies = [{ hobbyId: this.hobbyId, desc: this.desc }]
    return parsedHobbies
  }
}

module.exports = Hobbies
