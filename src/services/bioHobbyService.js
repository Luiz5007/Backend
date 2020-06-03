const bioHobbyRepository = require('../repositories/bioHobbyRepository')

module.exports = {
  async create(bioId, hobbies) {
    try {
      const biographyId = bioId
      const [unstructured] = hobbies

      const hobbyId = unstructured.id
      const descr = unstructured.descr

      const bioHobbyDescr = { biographyId, hobbyId, descr }

      const responseRepository = await bioHobbyRepository.create(bioHobbyDescr)

      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  },
}
