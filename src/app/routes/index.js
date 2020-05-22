const express = require('express')
const router = express.Router()

// Rota raiz
router.get('/', async (req, res) => {
  return res.send('Hello!')
})

router.use(require('./userRoutes'))
router.use(require('./biographyRoutes'))
router.use(require('./hobbyRoutes'))
router.use(require('./techRoutes'))

module.exports = router
