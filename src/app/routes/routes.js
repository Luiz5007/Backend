const express = require('express')
const router = express.Router()

// import controllers
const UserController = require('../controllers/userController')

// Rota raiz
router.get('/', async (req, res) => {
  return res.send('Hello!')
})

// Rotas gerais
// User
const userUrl = '/users'
router.post(userUrl, UserController.create) // create User
router.get(userUrl, UserController.index) // read Users
router.get(userUrl + '/:id', UserController.findById) // read One User
router.put(userUrl + '/:id', UserController.update) // update User
router.delete(userUrl + '/:id', UserController.delete) // delete User

module.exports = router
