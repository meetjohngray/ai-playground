import request from 'superagent'


export function getAnswer(question: string): Promise<string> {
  return request
    .post('/api/v1/openai')
    .send(question)
    .then((res) => res.body.data)
}



// export function getGreeting(): Promise<string> {
//   return request.get('/greeting').then((res) => res.body.greeting)
// }