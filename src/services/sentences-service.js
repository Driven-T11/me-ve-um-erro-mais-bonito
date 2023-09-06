import { conflictError } from "../errors/conflict.js"
import { notFoundError } from "../errors/notFound.js"
import sentencesRepository from "../repositories/sentences-repository.js"

function getSentences() {
  const result = sentencesRepository.getSentences()
  return result
}

function getSentence(id) {
  // Lançar erro se não vierem resultados
  const result = sentencesRepository.getSentenceById(id)
  if (!result) throw notFoundError("Frase")
  return result
}

function createSentence(author, sentence) {
  // Lançar erro se já existir a sentença cadastrada
  const existingSentence = sentencesRepository.getSentence(sentence)
  // console.log(existingSentence)
  if (existingSentence) throw conflictError("Frase")

  return sentencesRepository.createSentence(author, sentence)
}

const sentencesService = {
  getSentences,
  getSentence,
  createSentence
}

export default sentencesService