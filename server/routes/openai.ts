import 'dotenv/config'
import { Router } from 'express'
import { Configuration, OpenAIApi } from 'openai'


const router = Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

async function getCompletion(prompt: string) {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })
    const data = chatCompletion.data.choices[0].message
    return data
}

router.post('/', async (req, res) => {
  console.log('req', req.body)
  const prompt = req.body.question
  console.log('prompt', prompt)
  
  try {
    const data = await getCompletion(prompt)
    console.log("data", data)
    res.status(200).json({ data })
  } catch (error: unknown) {
    if (error instanceof Error) { 
      console.log(error.message)
    } else {    
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
})

export default router
