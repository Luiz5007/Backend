const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userUrl = '/users'

router.post(userUrl, userController.create) // create User
router.get(userUrl, userController.index) // read Users
router.get(`${userUrl}/:id`, userController.findById) // read One User
router.put(`${userUrl}/:id`, userController.update) // update User
router.delete(`${userUrl}/:id`, userController.delete) // delete User

module.exports = router
