const bioHobbyRepository = require('../repositories/bioHobbyRepository')

module.exports = {
  async create(bioId, hobbies) {
    try {
      var i = 0
      var unstructured = []
      var responseRepository

      for (i in hobbies) {
        const biographyId = bioId
        unstructured[i] = hobbies[i]

        var hobbyId = unstructured[i].id
        var descr = unstructured[i].descr

        var bioHobbyDescr = { biographyId, hobbyId, descr }

        responseRepository = await bioHobbyRepository.create(bioHobbyDescr)
      }
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },
}
