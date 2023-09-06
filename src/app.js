import express, { json } from "express"
import dotenv from "dotenv"
import sentencesRouter from "./routers/sentences-router.js"

const app = express()

app.use(json())
app.use(sentencesRouter)
dotenv.config()

const port = 5000

app.listen(port, () => {
  console.log(`Server is up and running or port: ${port}`)
})