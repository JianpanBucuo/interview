const hook = require('async_hooks')
const fs = require('fs')
const express = require('express')
// 当前执行上下文的asyncId
const eid = hook.executionAsyncId()
// 触发当前执行上下文的asyncId
const tid = hook.triggerAsyncId()

// 注册各种回调
const asyncHook = hook.createHook({
  init, before
})
// 开启asyncHook，开启后才会执行回调
asyncHook.enable();

fs.writeSync(1,`eid ${eid}\n`)
// 初始化异步操作时的钩子函数
function init(asyncId, type, triggerAsyncId, resource) {
  const eid = hook.executionAsyncId();
  fs.writeSync(1,`init: asyncId: ${asyncId} triggerAsyncId: ${triggerAsyncId} execution:${eid}\n`)
 }

// 异步回调执行之前的钩子函数，可能触发多次
function before(asyncId) {
  // fs.writeSync(1,`before: asyncId: ${asyncId} \n`)
 }

// 异步回调完成后的钩子函数
function after(asyncId) { }

// 异步资源销毁时的钩子函数
function destroy(asyncId) { }

// 调用promiseResolve时的钩子函数
function promiseResolve(asyncId) { }

// const app = express()
// app.get('/*', (req, res) => {
//   console.log('111')
//   res.send('11')
// })
// app.listen(3000)
function callback(err, data) {
  console.log('callback', data)
}
fs.readFile("a.txt", callback)
 fs.writeSync(1,'after a\n')
fs.readFile("b.txt", callback)
 fs.writeSync(1,'after b\n')
 function stackTrace() {
  const obj = {}
  Error.captureStackTrace(obj, stackTrace)
  return obj.stack
}