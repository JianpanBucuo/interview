const { spawn, spawnSync } = require('child_process')
const path = require('path')

const cp = spawn('ls', ['-a'], {
  cwd: path.resolve(__dirname, '../child_process')
})

cp.stdout.on('data', (data) => {
  console.log(`子进程输出:' ${data}`)
})

cp.on('exit', (code, signal) => {
  console.log('子进程退出:', `code ${code} and signal ${signal}`)
})

