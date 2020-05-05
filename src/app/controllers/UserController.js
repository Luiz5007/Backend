const UserService = require('../../services/userService')
const UserModel = require('../../infra/models/user')

module.exports = {
  async create(req, res) {
    try {
      const user = new UserModel()
      const errors = await user.base.getErrors()

      const responseService = await UserService.create(req.body) // esperando resposta do service
      // delete responseService.password // deleta atributo or exclude

      if (errors.length > 0) {
        return res.status(400).json(responseService)
      }

      return res.status(200).json(responseService)
    } catch (error) {
      console.log(error)

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
      await UserService.update(req.params.id, req.body)
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
