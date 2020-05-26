const techRepository = require('../repositories/techRepository')
const TechModel = require('../infra/models/techModel')

module.exports = {
  async create({ name }) {
    try {
      const tech = new TechModel()
      let nameInPattern = ''
      console.log(tech)

      if (await tech.validationName(name)) {
        nameInPattern = await tech.putNameInPattern(name)
        if (await techRepository.findByName(nameInPattern)) {
          await tech.addErrors('Tech ja cadastrada!')
        }
      }

      const errors = await tech.getErrors()

      if (errors.length > 0) {
        return tech
      }

      const data = { name: nameInPattern }

      const responseRepository = await techRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async index() {
    try {
      const responseRepository = await techRepository.index()
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(techId, { name }) {
    try {
      let tech = await techRepository.findById(techId)
      let nameInPattern = ''
      const data = {}

      if (!tech) {
        tech = new TechModel()
        await tech.addErrors('Tech não existe!')
        return tech
      }

      if (name) {
        if (await tech.validationName(name)) {
          nameInPattern = await tech.putNameInPattern(name)

          if (
            (await techRepository.findByName(nameInPattern)) &&
            nameInPattern !== tech.name
          ) {
            await tech.addErrors('Tech ja cadastrada!')
          } else {
            data.name = nameInPattern
          }
        }
      }

      const errors = await tech.getErrors()

      if (errors.length > 0) {
        return tech
      }

      const responseRepository = await techRepository.update(techId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async delete(techId) {
    try {
      const tech = new TechModel()

      if (!(await techRepository.findById(techId))) {
        await tech.addErrors('Tech não existe!')
        return tech
      }

      await techRepository.delete(techId)
      return tech
    } catch (error) {
      throw new Error(error)
    }
  },

  async findById(techId) {
    try {
      let tech = await techRepository.findById(techId)

      if (!tech) {
        tech = new TechModel()
        await tech.addErrors('Tech não existe!')
      }

      return tech
    } catch (error) {
      throw new Error(error)
    }
  },
}
