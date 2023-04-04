import express from "express"
const app = express()
import bodyparser from "body-parser"
import cors from "cors"
import volleyball from "volleyball"
import routes from "./routes/index.js"
import dotenv from "dotenv"
dotenv.config()

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://ncf-argentina.hml.naturacloud.com"
  )
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  )
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE")
  next()
})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.options("*", cors())

app.use(volleyball)
app.use(express.json())

app.use("/api", routes)

app.get("/", (req, res) => {
  res.send("TESTING DEPOLOY VERCLLLLLLLLLL 0.2")
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON http://localhost:${PORT}`)
})
