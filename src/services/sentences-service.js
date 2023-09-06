import { conflictError } from "../errors/conflict.js"
import { notFoundError } from "../errors/notFound.js"
import sentencesRepository from "../repositories/sentences-repository.js"

async function getSentences() {
  const result = await sentencesRepository.getSentences()
  return result
}

async function getSentence(id) {
  // Lançar erro se não vierem resultados
  const result = await sentencesRepository.getSentenceById(id)
  if (!result) throw notFoundError("Frase")
  return result
}

async function createSentence(author, sentence) {
  // Lançar erro se já existir a sentença cadastrada
  const existingSentence = await sentencesRepository.getSentence(sentence)
  console.log(existingSentence)
  if (existingSentence) throw conflictError("Frase")

  return sentencesRepository.createSentence(author, sentence)
}

const sentencesService = {
  getSentences,
  getSentence,
  createSentence
}

export default sentencesService