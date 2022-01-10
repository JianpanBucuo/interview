const http = require('http')
const url = require('url')
function createApplication () {
  let app = {}

  app.routes = []
 
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
  app.use = function(path, handler) {
    if(typeof path !== "string") { // 第一个参数不是字符串，说明不是路径，而是方法
      handler = path;
      path = "/"
  }
    let layer = {
        method: "middle",
        path,
        handler
    }
    app.routes.push(layer)
  }
  app.listen = function() {
    const server = http.createServer(function(req, res) {
      let index = 0;
      let m = req.method.toLowerCase()
      let { pathname } = url.parse(req.url, true)
      console.log(index,'id')
      function next() {
        if(index === app.routes.length) return res.end('Cannot find')
        let { method, path, handler } = app.routes[index++]
        if(method === 'middle') {
          if (path === '/' || path === pathname || pathname.starWidth(path + '/')) {
            handler(req, res, next)
          } else { // 继续遍历
              next();
          }
        } else {
          if ((method === m || method === 'all') && (path === pathname || path === "*")) {
            index =0
            handler(req, res);
          } else {
              next();
          }
        }
      }


        next()
      // res.end('aaa')
    })
    server.listen(...arguments)
  }
  return app
}
module.exports = createApplication


