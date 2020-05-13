const biographyService = require('../../services/biographyService')

module.exports = {
  async create(req, res) {
    try {
      const responseService = await biographyService.create(
        req.params.userId,
        req.body,
      )
      return res.status(200).json(responseService)
    } catch (error) {
      // console.log(error)
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },

  async update(req, res) {
    try {
      await biographyService.update(
        req.body,
        req.params.bioId,
        req.params.userId,
      )
      return res.status(200).json({ msg: 'User Updated!' })
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },
}
