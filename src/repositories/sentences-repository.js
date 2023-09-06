let sentences = []

function getSentences() {
  return sentences
}

function getSentenceById(id) {
  return sentences.find(sentence => sentence.id === id)
}

function getSentence(targetSentence) {
  return sentences.find(({ sentence }) => sentence === targetSentence)
}

function createSentence(author, sentence) {
  return sentences.push({
    id: new Date().getTime(),
    author,
    sentence
  })
}

const sentencesRepository = {
  getSentences,
  getSentenceById,
  getSentence,
  createSentence
}

export default sentencesRepository