const express = require('express')
const socketio = require('socket.io')
const app = new express()

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../../webpack.dev')


app.use(express.static('public'))
if(process.env.NODE_ENV === 'development'){
    // 这里是开发模式
    // 这里使用了webpack-dev-middleware的中间件，作用就是代码改动就使用webpack.dev的配置进行打包文件
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
  } else {
    // 上线环境就只需要展示打包后的文件夹
    app.use(express.static('dist'))
  }

const port = process.env.PORT || 3000;
const server = app.listen(3000, () => {
  console.log('Server Listening on port: ' + port)
})


// 监听socket服务
const io = socketio(server)


io.on('connection', socket=> {
    socket.on('login',data =>{
        socket.emit('success', data.name)
      });
    // si
})

 
// io.on('test', data => {
//     console.log(data)
// })