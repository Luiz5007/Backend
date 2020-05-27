const hobbiesService = require('../../services/hobbiesService')

module.exports = {
  async create(req, res) {
    try {
      const responseService = await hobbiesService.create(req.boy)
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json('Server Internal Error!')
    }
  },
}
