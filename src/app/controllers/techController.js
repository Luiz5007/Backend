const techService = require('../../services/techService')

module.exports = {
  async create(req, res) {
    try {
      const responseService = await techService.create(req.body)
      // verificar errors
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error! ' })
    }
  },

  async index(req, res) {
    try {
      const responseService = await techService.index()

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  },

  async update(req, res) {
    try {
      const responseService = await techService.update(
        req.params.techId,
        req.body,
      )
      // verificar errors
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  },

  async delete(req, res) {
    try {
      await techService.delete(req.params.techId)
      // verificar errors
      return res.status(204).json()
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  },

  async findById(req, res) {
    try {
      const responseService = await techService.findById(req.params.techId)
      // verificar errors
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  },
}
