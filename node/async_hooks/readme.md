### async hooks 异步资源状态共享

存储请求上下文，在异步调用之间共享数据

先请求进来的数据容易被后请求来的用户数据所覆盖，

#### 何为异步本地存储

我们所说的`异步本地存储`类似于多线程编程语言中的线程本地存储

在 node 中我们的业务通常都工作在主线程中，是没有 ThreadLocal 类的，
并且以事件驱动的方式来处理所有的 Http 请求，每个请求过来之后都是异步的，异步之间还很难去追踪上下文信息，我们想做的是在这个异步事件开始，例如从接收 HTTP 请求到响应，能够有一种机制可以让我们随时随地去获取在这期间的一些共享数据

#### 记录日志时增加 traceId 实现全链路日志追踪

##### 动手实现异步本地存储

解决方案是实现请求上下文 本地存储， 在当前作用域代码中能够获取`请求上下文信息`,待处理完毕清除保存的上下文信息，这些需求可以通过 Async hooks 提供的 API 实现
https://juejin.cn/post/6922582727375978510#heading-2
https://mp.weixin.qq.com/s/DIDQaJgQcVwsdnbjx7LN_w
https://zhuanlan.zhihu.com/p/27394440
winston
https://github.com/winstonjs/winston/blob/master/docs/transports.md

获取当前异步资源 ID，和触发当前异步资源的 资源 ID

```js
const asyncHooks = require('async_hooks')
const fs = require('fs')

//当前 异步资源ID
const asyncId = () => asyncHooks.executionAsyncId()
// 触发当前异步资源的 异步资源ID（源ID）
const triggerAsyncId = () => asyncHooks.triggerAsyncId()

console.log(
  `Global asyncId: ${asyncId()}, Global triggerAsyncId: ${triggerAsyncId()}`
)

fs.open('hello.txt', (err, res) => {
  console.log(
    `fs.open asyncId: ${asyncId()}, fs.open triggerAsyncId: ${triggerAsyncId()}`
  )
})
// Global asyncId: 1, Global triggerAsyncId: 0
// fs.open asyncId: 5, fs.open triggerAsyncId: 1
```

<!-- 开启Promise 监控 -->

```js
const syncLog = (...args) =>
  fs.writeFileSync('log.txt', `${args.join(' ')}\n`, { flag: 'a' })

const hooks = asyncHooks.createHook({
  promiseResolve(asyncId) {
    syncLog('promiseResolve: ', asyncId)
  }
})
// 开启promise 启用 hooks实例
hooks.enable()
new Promise((resolve) => resolve(true)).then((a) => {}).then((a) => {})
// promiseResolve:  2
// promiseResolve:  3
// promiseResolve:  4
```

<!-- 目前只解决了在当前异步资源ID中获取 源资源ID， 下面将实现数据共享 -->
<!-- 异步之间的共享上下文 -->

https://juejin.cn/post/6844904101000511502
https://juejin.cn/post/6950545906181767205#comment
https://nodejs.org/dist/latest-v15.x/docs/api/async_hooks.html

#### 添加 hook 的能力

在所有异步任务创建，执行前，执行后，销毁后，触发回调，所有回调会传入 asyncId
