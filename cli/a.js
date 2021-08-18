const http = require('http')
const app = http.createServer((req, res) => {
    res.end('aaa')
})
app.listen(3011)


 