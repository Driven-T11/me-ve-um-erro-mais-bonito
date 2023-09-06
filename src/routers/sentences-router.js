import { Router } from "express"
import sentencesController from "../controllers/sentences-controller.js"

const sentencesRouter = Router()
sentencesRouter.get("/sentences", sentencesController.getSentences)
sentencesRouter.get("/sentences/:id", sentencesController.getSentence)
sentencesRouter.post("/sentences", sentencesController.createSentence)

export default sentencesRouter