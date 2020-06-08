const bioHobbyRepository = require('../repositories/bioHobbyRepository')

module.exports = {
  async create(bioId, hobbies) {
    try {
      const unstructured = []
      var responseRepository
      // para cada hobby, uma chamada de criação
      for (var i in hobbies) {
        unstructured[i] = hobbies[i]
        // desestruturando o array de hobbies
        const hobbyId = unstructured[i].id
        const descr = unstructured[i].descr
        const biographyId = bioId
        const data = { biographyId, hobbyId, descr }

        responseRepository = await bioHobbyRepository.create(data)
      }
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },

  async update(bioId, hobbies) {
    try {
      const unstructured = []
      const responseRepository = []

      for (var i in hobbies) {
        unstructured[i] = hobbies[i]

        const hobbyId = unstructured[i].id
        const descr = unstructured[i].descr
        const biographyId = bioId
        const data = { biographyId, hobbyId, descr }
        responseRepository.push(
          await bioHobbyRepository.update(biographyId, data),
        )
      }

      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },
}
