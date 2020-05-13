const userService = require('../../services/userService')

module.exports = {
  async create(req, res) {
    try {
      const responseService = await userService.create(req.body) // esperando resposta do service

      const errors = await responseService.getErrors()

      if (errors.length > 0) {
        return res.status(400).json(errors)
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },

  async findById(req, res) {
    try {
      const responseService = await userService.findById(req.params.id)

      const errors = await responseService.getErrors()

      if (errors.length > 0) {
        return res.status(400).json(errors)
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error! ' })
    }
  },

  async index(req, res) {
    // read
    try {
      const responseService = await userService.index()
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },

  async update(req, res) {
    try {
      const responseService = await userService.update(req.params.id, req.body)

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
      const responseService = await userService.delete(req.params.id)

      const errors = await responseService.getErrors()

      if (errors.length > 0) {
        return res.status(400).json(errors)
      }

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },
}
