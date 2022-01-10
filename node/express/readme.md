1. 首先 express 返回一个函数
2. 调用该函数时会以 http 各个请求方法为 key 创建一个方法 A
3. 该方法接收两个参数，path 路径和 handler 回调函数
4. 如调用该方法 A，会将 method，path，handler 为一组，将该对象保存到 routes 数组中

```js
const app = express()
// 调用express方法时，实际上初始化了如下方法B
http.METHODS.forEach((method) => {
  method = method.toLowerCase()
  app[method] = function (path, handler) {
    let layer = {
      method,
      path,
      handler
    }
    app.routes.push(layer)
  }
})

// 使用者会在 const app = express() 编写各个路由的函数
app.get('/', (req, res) => {
  console.log('1111')
  res.end('Hello World!')
})
// 这句话其实不会马上执行，而是以method，path，handler 为一组，将该对象保存到 routes 数组中

// 之后app.listen()开启服务，当请求过来时会遍历routes，如有匹配项，则触发handler
for (let i = 0; i < app.routes.length; i++) {
  const { method, path, handler } = app.routes[i]
  if (method === m && path === pathname) {
    handler(req, res)
  }
}
```

express 的另一个主要功能就是中间件
