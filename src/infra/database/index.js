const Sequelize = require('sequelize')
const dbConfig = require('../../config/database')
const user = require('../models/userModel')
const biography = require('../models/biographyModel')
const tech = require('../models/techModel')

const models = [user, biography, tech]

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
    models.map((model) => {
      if (model.associate) model.associate(this.connection.models)
    })
  }
}

module.exports = new DataBase()

// npx sequelize db:create
// npx sequelize migration:create --name=XXXXXXX
// npx sequelize db:migrate
// npx sequelize db:migrate:undo
