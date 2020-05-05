class BaseModel {
  constructor() {
    this.errors = []
  }

  static async getErrors() {
    if (!this.errors) {
      this.errors = []
    }
    return this.errors
  }

  static async addErrors(err) {
    if (!this.errors) {
      this.errors = []
    }
    this.errors.push(err)
  }
}

module.exports = BaseModel
