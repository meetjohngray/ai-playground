import request from 'superagent'

export function getAnswer(question): Promise<string> {
  console.log('api request', question)
  return request
    .post('/api/v1/openai')
    .send(question)
    .then((res) => {
      console.log('api', res.body)
      return res.body.data.content
    })
}



// export function getGreeting(): Promise<string> {
//   return request.get('/greeting').then((res) => res.body.greeting)
// }