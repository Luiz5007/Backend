module.exports = {
  async create(req, res) {
    try {
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error!' })
    }
  },
}
