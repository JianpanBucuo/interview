const asyncHooks= require('async_hooks')

const fs = require('fs')
const hooks = asyncHooks.createHook({});
hooks.enable();
const asyncId = () => asyncHooks.executionAsyncId()

const triggerAsyncId = () => asyncHooks.triggerAsyncId()  // 当前异步资源是由哪个异步资源创建的 (源ID)

console.log(`Global asyncId: ${asyncHooks.executionAsyncId()} ${asyncId()}, Global triggerAsyncId: ${triggerAsyncId()}`);

fs.open('hello.txt', (err, res) => {
  console.log(`fs.open asyncId: ${asyncId()}, fs.open triggerAsyncId: ${triggerAsyncId()}`);
});
Promise.resolve().then(() => {
  // Promise asyncId: 7. Promise triggerAsyncId: 6
  console.log(`Promise asyncId: ${asyncId()}. Promise triggerAsyncId: ${triggerAsyncId()}`);
})