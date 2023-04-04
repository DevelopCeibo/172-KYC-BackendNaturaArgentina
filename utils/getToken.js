import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const GET_TOKEN_URL = `https://${process.env.SUBDOMAIN}.auth.marketingcloudapis.com/v2/token`

const GET_TOKEN_BODY = {
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  account_id: process.env.ACCOUNT_ID,
}

export async function gettoken() {
  try {
    const data = await axios.post(GET_TOKEN_URL, GET_TOKEN_BODY)
    return data.data.access_token
  } catch (err) {
    console.error(err)
  }
}
export default gettoken
