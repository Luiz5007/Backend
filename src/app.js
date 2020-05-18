const express = require('express')
const routes = require('./app/routes/index')
const cors = require('cors')

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(cors()) // filtra quem vai acessar o backend
    this.server.use(express.json()) // diz ao server que receberei requisicoes em json
  }

  routes() {
    this.server.use(routes)
  }
}

module.exports = new App().server
