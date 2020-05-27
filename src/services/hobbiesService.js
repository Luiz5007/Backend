const hobbiesRepository = require('../repositories/hobbiesRepository')

module.exports = {
  async create({ bioId, hobbyId, descr }, res) {
    try {
      const data = { bioId, hobbyId, descr }
      const responseRepository = await hobbiesRepository.creat(data)
      return responseRepository
    } catch (error) {
      return res.status(500).json('Server Internal Error!')
    }
  },
}
