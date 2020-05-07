const UserService = require('../../services/userService')

module.exports = {
  async create(req, res) {
    try {
      const responseService = await UserService.create(req.body) // esperando resposta do service

      const errors = await responseService.getErrors()

      if (errors.length > 0) {
        return res.status(400).json(errors)
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },

  async index(req, res) {
    // read
    try {
      const responseService = await UserService.index()
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },

  async update(req, res) {
    try {
      const responseService = await UserService.update(req.params.id, req.body)

      if (responseService.errors) {
        return res.status(400).json(responseService.errors)
      }

      return res.status(200).json({ msg: 'User updated! ' })
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },

  async delete(req, res) {
    try {
      await UserService.delete(req.params.id)
      return res.status(204).json({ msg: 'User deleted! ' })
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },
}
