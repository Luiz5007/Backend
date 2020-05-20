const hobbyService = require('../../services/hobbyService')

module.exports = {
  async create(req, res) {
    try {
      const responseService = await hobbyService.create(req.body)

      const errors = await responseService.getErrors()

      if (errors.length > 0) {
        // requisicao invalida
        return res.status(400).json(errors)
      }
      // Sucesso
      return res.status(200).json(responseService)
    } catch (error) {
      // error interno do servidor
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },
  async index(req, res) {
    try {
      const responseService = await hobbyService.index()
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },
  async update(req, res) {
    try {
      const responseService = await hobbyService.update(req.params.id, req.body)

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
  async delete(req, res) {
    try {
      const responseService = await hobbyService.delete(req.params.id)

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
