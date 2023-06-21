import { Router } from 'express'

import 'dotenv/config'
import { Configuration, OpenAIApi } from 'openai'

const router = Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

router.get('/', (req, res) => {
  async function getCompletion() {
    try {
      const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello, who am I?' }],
      })
      console.log(chatCompletion.data.choices[0].message)
      res.send(chatCompletion.data.choices[0].message)
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
      } else {
        console.log(error.message)
      }
    }
  }

  getCompletion()
})

export default router
