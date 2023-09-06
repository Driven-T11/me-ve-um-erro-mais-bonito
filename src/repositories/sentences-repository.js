import { db } from "../configs/db-connection.js"

async function getSentences() {
  const sentence = await db.query(`SELECT * FROM sentences;`)
  return sentence.rows
}

async function getSentenceById(id) {
  const sentence = await db.query(`SELECT * FROM sentences WHERE id=$1;`, [id])
  return sentence.rows[0]
}

async function getSentence(targetSentence) {
  const sentence = await db.query(
    `SELECT * FROM sentences WHERE sentence=$1;`,
    [targetSentence]
  )
  return sentence.rows[0]
}

async function createSentence(author, sentence) {
  await db.query(
    `INSERT INTO sentences (author, sentence) VALUES ($1, $2);`,
    [author, sentence]
  )
}

const sentencesRepository = {
  getSentences,
  getSentenceById,
  getSentence,
  createSentence
}

export default sentencesRepository