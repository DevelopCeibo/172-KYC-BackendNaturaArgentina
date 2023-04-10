import axios from "axios"
import express from "express"
import gettoken from "../utils/getToken.js"
import path from "path"
import dotenv from "dotenv"
dotenv.config()
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TYrouter = express.Router()

const URL = `https://${process.env.SUBDOMAIN}.rest.marketingcloudapis.com/hub/v1/dataevents/key:${process.env.DATA_EXTENSION_KEY_GRACIAS}/rowset`

TYrouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/gracias.html"))
})

TYrouter.post("/", async (req, res) => {
  const {
    email,
    comentario,
    pais,
  } = req.body

  let todayDate = new Date().toISOString().slice(0, 10)

  const dataBody = [
    {
      keys: {
        EMAIL: email,
      },
      values: {
        EMAIL: email,
        COMENTARIO: comentario,
        PAIS: "Argentina",
      },
    },
  ]

  try {
    const token = await gettoken()
    if (!token) {
      console.error("no hay token")
      res.sendStatus(500)
    }
    const response = await axios.post(URL, dataBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.errorcode) {
      res.sendStatus(200)
    }
  } catch (err) {
    console.error(err)
  }
})

export default TYrouter
