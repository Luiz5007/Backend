const HobbiesModel = require('../infra/models/hobbiesModel')

module.exports = {
  async create(data, res) {
    try {
      const hobbies = await HobbiesModel.create(data)
      return hobbies
    } catch (error) {
      return res.status(500).json('Server Internal Error!')
    }
  },
}
