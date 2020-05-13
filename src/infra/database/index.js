const Sequelize = require('sequelize')
const dbConfig = require('../../config/database')
const user = require('../models/userModel')
const biography = require('../models/biographyModel')

const models = [user, biography]

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
