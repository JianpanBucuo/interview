const cluster = require('cluster')
// 查看操作系统相关
const os = require('os')
const express = require('express')
const path = require('path')

console.log('总内存',os.totalmem(), 'bytes')
console.log('空闲内存',os.freemem(), 'bytes')
const app = express()
const numCPUs = os.cpus().length
console.log('cpu核',numCPUs)

if(cluster.isMaster) {
  console.log(`Master pid${process.pid} is running` )
  for( let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  app.get('/',function(req, res) {
    res.send({
      a:1
    })
  })
  app.listen(3000, function() {
    console.log(`Worker ${process.pid} is started`)
  })
}