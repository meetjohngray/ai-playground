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

router.get('/', async (req, res) => {
  console.log(req.body)
  const prompt = req.body.question
  
  try {
    const data = await getCompletion(prompt)
    res.status(200).json({ data })
  } catch (error: unknown) {
    if (error instanceof Error) { 
      console.error(error)
    } else {    
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
})

export default router
