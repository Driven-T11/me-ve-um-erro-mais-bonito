import express, { json } from "express"
import "express-async-errors"
import dotenv from "dotenv"
import sentencesRouter from "./routers/sentences-router.js"
import errorHandler from "./middlewares/error-middleware.js"

const app = express()

dotenv.config()
app.use(json())
app.use(sentencesRouter)
app.use(errorHandler)


const port = 5000

app.listen(port, () => {
  console.log(`Server is up and running or port: ${port}`)
})