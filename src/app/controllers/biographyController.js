const biographyService = require('../../services/biographyService')

module.exports = {
  async create(req, res) {
    try {
      const responseService = await biographyService.create(
        req.params.userId,
        req.body,
      )
      const errors = await responseService.getErrors()
      if (errors.length > 0) {
        return res.status(400).json(errors)
      }
      return res.status(200).json(responseService)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },

  async update(req, res) {
    try {
      const responseService = await biographyService.update(
        req.body,
        req.params.bioId,
        req.params.userId,
      )
      const errors = await responseService.getErrors()

      if (errors.length > 0) {
        return res.status(400).json(errors)
      }
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },

  async delete(req, res) {
    try {
      const responseService = await biographyService.delete(
        req.params.userId,
        req.params.bioId,
      )
      const errors = await responseService.getErrors()

      if (errors.length > 0) {
        return res.status(400).json(errors)
      }

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error! ' })
    }
  },
}
