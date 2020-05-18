const express = require('express')
const router = express.Router()
const biographyController = require('../controllers/biographyController')
const userUrl = '/users'
const biographyUrl = '/biography'

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
