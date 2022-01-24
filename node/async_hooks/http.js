const express = require('express')
const fs = require('fs')
const  asyncHooks =require('async_hooks') ;
asyncHooks.createHook({
  init (asyncId, type, triggerAsyncId) {
    const eid = asyncHooks.executionAsyncId()
    fs.writeSync(1, `${type}(${asyncId}): trigger源ID: ${triggerAsyncId} execution: ${eid}\n`)
  }
}).enable()


const app = express()

app.all('*', (req, res) => {
  res.send('Hello World!')
})

app.listen(3001)