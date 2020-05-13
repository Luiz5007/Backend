const express = require('express')
const router = express.Router()

// import controllers
const userController = require('../controllers/userController')
const biographyController = require('../controllers/biographyController')

// Rota raiz
router.get('/', async (req, res) => {
  return res.send('Hello!')
})

// Rotas gerais
// User
const userUrl = '/users'
router.post(userUrl, userController.create) // create User
router.get(userUrl, userController.index) // read Users
router.get(`${userUrl}/:id`, userController.findById) // read One User
router.put(`${userUrl}/:id`, userController.update) // update User
router.delete(`${userUrl}/:id`, userController.delete) // delete User

const biographyUrl = '/biography'
router.post(`${userUrl}/:userId${biographyUrl}`, biographyController.create)

module.exports = router
