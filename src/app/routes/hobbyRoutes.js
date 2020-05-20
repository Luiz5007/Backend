const express = require('express')
const router = express.Router()
const hobbyController = require('../controllers/hobbyController')
const hobbyUrl = '/hobbies'

router.post(hobbyUrl, hobbyController.create) // create hobby
router.get(hobbyUrl, hobbyController.index) // read hobbies
router.put(`${hobbyUrl}/:id`, hobbyController.update) // update hobby
router.delete(`${hobbyUrl}/:id`, hobbyController.delete) // delete hobby

module.exports = router
