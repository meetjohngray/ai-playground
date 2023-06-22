import { useState, useEffect } from 'react'
import { getAnswer } from '../apiClient'

const App = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isError, setIsError] = useState(false)

  // useEffect(() => {
  //   getAnswer(question)
  //     .then((data) => {
  //       console.log(data)
  //       setAnswer(data)
  //       setIsError(false)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       setIsError(true)
  //     })
  // }, [question])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestion(e.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(question)
    getAnswer(question)
      .then((data) => {
        console.log('App', data)
        setAnswer(data)
        setQuestion('')
      })
      .catch((err) => console.log(err))
    }

  return (
    <>
     
      <h1>Ask Me Anything</h1>
      {isError && (
        <p style={{ color: 'red' }}>
          There was an error retrieving the greeting.
        </p>
      )}
      <form onSubmit={handleSubmit} aria-label='Ask a question'>
        <label htmlFor='question'>Question</label>
        <textarea 
          id='question' 
          name='question'
          value={question} 
          onChange={handleChange}
        />
        <button type='submit' >Submit</button>
      </form>
        {
          {answer} && <p>{answer}</p>
        }
    </>
  )
}

export default App
