const express = require('express')
const router = express()
const techController = require('../controllers/techController')
const techUrl = '/technologies'

router.post(techUrl, techController.create)
router.get(techUrl, techController.index)
router.put(`${techUrl}/:techId`, techController.update)
router.delete(`${techUrl}/:techId`, techController.delete)
router.get(`${techUrl}/:techId`, techController.findById)

module.exports = router
