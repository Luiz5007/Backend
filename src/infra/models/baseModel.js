const { Model } = require('sequelize')

class BaseModel extends Model {
  static init(attributes, options) {
    super.init(attributes, options)
  }

  constructor(values, options) {
    super(values, options)
    this.errors = []
  }

  async getErrors() {
    return this.errors
  }

  async addErrors(err) {
    this.errors.push(err)
  }
}

module.exports = BaseModel
