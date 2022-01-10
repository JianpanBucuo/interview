const http = require('http')
const url = require('url')
function createApplication () {
  let app = {}

  app.routes = []
  let index = 0;
  http.METHODS.forEach(method => {
    method = method.toLowerCase()
    app[method] = function(path, handler) {
      let layer = {
        method ,
        path,
        handler
      }
      app.routes.push(layer)
    }
  })
  app.listen = function() {
    const server = http.createServer(function(req, res) {
      let m = req.method.toLowerCase()
      let { pathname } = url.parse(req.url, true)




      for(let i = 0; i < app.routes.length; i++) {
        const { method, path, handler } = app.routes[i]
        if(method === m && path === pathname) {
          handler(req, res)
        }
      }
      // res.end('aaa')
    })
    server.listen(...arguments)
  }
  return app
}
module.exports = createApplication


