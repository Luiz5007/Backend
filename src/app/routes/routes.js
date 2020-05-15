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

const userUrl = '/users'
const biographyUrl = '/biography'
// User
router.post(userUrl, userController.create) // create User
router.get(userUrl, userController.index) // read Users
router.get(`${userUrl}/:id`, userController.findById) // read One User
router.put(`${userUrl}/:id`, userController.update) // update User
router.delete(`${userUrl}/:id`, userController.delete) // delete User
// Biography
router.post(`${userUrl}/:userId${biographyUrl}`, biographyController.create)
router.put(
  `${userUrl}/:userId${biographyUrl}/:bioId`,
  biographyController.update,
)
router.delete(
  `${userUrl}/:userId${biographyUrl}/:bioId`,
  biographyController.delete,
)

module.exports = router
