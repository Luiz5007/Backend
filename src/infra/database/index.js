const Sequelize = require('sequelize')
const dbConfig = require('../../config/database')
const User = require('../models/userModel')
const Biography = require('../models/biographyModel')
const connection = new Sequelize(dbConfig)

User.init(connection)

// Users.sync({ force: true }) forca a tabela a ser dropada e recriada
Biography.init(connection)

module.exports = connection

// npx sequelize db:create
// npx sequelize migration:create --name=XXXXXXX
// npx sequelize db:migrate
// npx sequelize db:migrate:undo
