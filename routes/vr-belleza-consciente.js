import axios from "axios"
import express from "express"
import gettoken from "../utils/getToken.js"
import path from "path"
import dotenv from "dotenv"
dotenv.config()
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BCRrouter = express.Router()

const URL = `https://${process.env.SUBDOMAIN}.rest.marketingcloudapis.com/hub/v1/dataevents/key:${process.env.DATA_EXTENSION_KEY_BC_VR}/rowset`

BCRrouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/expresion-de-color.html"))
})

BCRrouter.post("/", async (req, res) => {
  console.log("llego el post")
  const {
    email,
    nombre,
    apellido,
    fecha,
    check1,
    check2,
    utm_medium,
    utm_source,
  } = req.body

  let todayDate = new Date().toISOString().slice(0, 10)

  const dataBody = [
    {
      keys: {
        EMAIL: email,
      },
      values: {
        PERSON_NAME: nombre,
        PERSON_SURNAME: apellido,
        FECHA_NACIMIENTO: fecha,
        "OK PROMOCIONES": check1,
        "OK MAYOR EDAD": check2,
        EMAIL: email,
        UTM_MEDIUM: utm_medium,
        UTM_SOURCE: utm_source,
        FECHA_REGISTRO: todayDate,
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
    console.error(err.stack)
  }
})

export default BCRrouter
