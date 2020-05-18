const express = require('express')
const app = express()
const routes = require('./app/routes/index')
const cors = require('cors')

// filtra quem vai acessar o backend
app.use(cors())

// diz ao express que receberei requisicoes em json
app.use(express.json())

app.use(routes)

module.exports = app
