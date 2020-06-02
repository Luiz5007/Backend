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

  async addErrors(errs) {
    if (Array.isArray(errs)) {
      errs.map((err) => this.errors.push(err))
    } else {
      this.errors.push(errs)
    }
  }
}

module.exports = BaseModel
