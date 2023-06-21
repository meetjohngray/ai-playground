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
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {role: 'user', content: 'Hello, who am I?'},
      ]
    })
    console.log(chatCompletion.data.choices[0].message)
  }
  catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

getCompletion()

export default server
