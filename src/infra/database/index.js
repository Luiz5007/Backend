const Sequelize = require('sequelize')
const dbConfig = require('../../config/database')
const User = require('../models/userModel')
const Biography = require('../models/biographyModel')

const models = [User, Biography]
class DataBase {
  constructor() {
    this.connection = new Sequelize(dbConfig)
    this.init()
    this.associate()
  }

  init() {
    models.map((model) => model.init(this.connection))
  }

  associate() {
    models.map((model) => model.associate(this.connection.models))
  }
}

module.exports = new DataBase()

// npx sequelize db:create
// npx sequelize migration:create --name=XXXXXXX
// npx sequelize db:migrate
// npx sequelize db:migrate:undo
