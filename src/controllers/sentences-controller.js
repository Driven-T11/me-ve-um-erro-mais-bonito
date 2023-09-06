import httpStatus from "http-status"
import sentencesService from "../services/sentences-service.js"
import { invalidIdError } from "../errors/invalidId.js"
import { incompleteDataError } from "../errors/incompleteData.js"

function getSentences(req, res) {
  try {
    const sentences = sentencesService.getSentences()
    res.send(sentences)
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

function getSentence(req, res) {
  const { id } = req.params // Tratar caso onde o id não é um número inteiro positivo

  try {
    if (isNaN(id) || id <= 0 || !Number.isInteger(Number(id))) throw invalidIdError()

    const sentences = sentencesService.getSentence(parseInt(id))
    res.send(sentences)

  } catch (err) {
    if (err.type === "invalidId") {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message)
    }

    if (err.type === "notFound") {
      return res.status(httpStatus.NOT_FOUND).send(err.message)
    }

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

function createSentence(req, res) {
  const { body } = req
  const { author, sentence } = body // Tratar caso onde os valores não são preenchidos (ou vazios)

  try {
    if (!author || !sentence) throw incompleteDataError()

    sentencesService.createSentence(author, sentence)
    res.sendStatus(httpStatus.CREATED)

  } catch (err) {
    if (err.type === "incompleteData") {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message)
    }

    if (err.type === "conflict") {
      return res.status(httpStatus.CONFLICT).send(err.message)
    }

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

const sentencesController = {
  getSentences,
  getSentence,
  createSentence
}

export default sentencesController