import { join } from 'node:path'
import express from 'express'
import 'dotenv/config'
import cors, { CorsOptions } from 'cors'
import { Configuration, OpenAIApi } from 'openai'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))
server.use(cors('*' as CorsOptions))

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

async function getCompletion() {
  const completion = await openai.createCompletion ({
    model: 'text-davinci-003',
    prompt: 'How are you?', 
  })
  console.log(completion.data.choices[0].text)
}

getCompletion()

export default server
