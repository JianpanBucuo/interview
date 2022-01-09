const asyncHooks = require('async_hooks')
const fs = require('fs')

// //当前 异步资源ID
const asyncId = () => asyncHooks.executionAsyncId()
// // 触发当前异步资源的 异步资源ID（源ID）
// const triggerAsyncId = () => asyncHooks.triggerAsyncId()

// console.log(`Global asyncId: ${asyncId()}, Global triggerAsyncId: ${triggerAsyncId()}`);

// fs.open('hello.txt', (err, res) => {
//   console.log(`fs.open asyncId: ${asyncId()}, fs.open triggerAsyncId: ${triggerAsyncId()}`);
// });


const syncLog = (...args) => fs.writeFileSync('log.txt', `${(args.join(' '))}\n`, { flag: 'a' } );

const hooks = asyncHooks.createHook({
  promiseResolve(asyncId) {
    syncLog('promiseResolve: ', asyncId);
  }
})
hooks.enable();
new Promise((resolve) => resolve(true)).then((a) => {}).then(a => {}) ;


// 数据共享
const { AsyncLocalStorage } = require('async_hooks')
const asyncLocalStorage = new AsyncLocalStorage()

asyncLocalStorage.run({traceId: asyncId(),a: '2'}, test1)
function test1() {
  setTimeout(() => {
    test2()
    console.log('当前asyncId', asyncId())
  },2000)
}
function test2() {
  console.log(asyncLocalStorage.getStore())
}
// test1()