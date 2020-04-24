const express = require('express')
const app = express()
const cors = require('cors')

// filtra quem vai acessar o backend
app.use(cors())

// diz ao express que receberei requisicoes em json
app.use(express.json())

app.get('/cadastro', (req, res) => {
})

app.listen(3333, () => {
  console.log('Server On')
  console.log('http://localhost:3333')
})
