var http = require('http');
 

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({a:'1'}));
})
server.listen(5000);