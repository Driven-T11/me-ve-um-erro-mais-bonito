import httpStatus from "http-status"
import sentencesService from "../services/sentences-service.js"
import { invalidIdError } from "../errors/invalidId.js"
import { incompleteDataError } from "../errors/incompleteData.js"

async function getSentences(req, res) {
  const sentences = await sentencesService.getSentences()
  res.send(sentences)
}

async function getSentence(req, res) {
  const { id } = req.params // Tratar caso onde o id não é um número inteiro positivo

  if (isNaN(id) || id <= 0 || !Number.isInteger(Number(id))) throw invalidIdError()

  const sentences = await sentencesService.getSentence(parseInt(id))
  res.send(sentences)
}

async function createSentence(req, res) {
  const { body } = req
  const { author, sentence } = body // Tratar caso onde os valores não são preenchidos (ou vazios)

  if (!author || !sentence) throw incompleteDataError()

  await sentencesService.createSentence(author, sentence)
  res.sendStatus(httpStatus.CREATED)
}

const sentencesController = {
  getSentences,
  getSentence,
  createSentence
}

export default sentencesController