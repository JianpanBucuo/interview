const express = require('./myExpressWithUse')
const app = express()
const port = 3000
app.use('/', (req, res, next) => {
  console.log('next')
   next()
})

app.get('/', (req, res) => {
  console.log('1111')
  res.end('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
