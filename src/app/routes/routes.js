const express = require('express')
const router = express.Router()
const BiographyModel = require('../../infra/models/biographyModel')
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

const biographyUrl = '/biography'
router.post(userUrl + '/:id' + biographyUrl, (req, res) => {
  const biography = BiographyModel.create({
    full_name: 'Josué',
    nickname: 'Jow',
    birthday: Date.now(),
    about_you: 'Hellow Wolrd! Nasci hoje e já sou estag!!!',
    user_id: 2,
  })

  return res.json(biography)
})

module.exports = router
