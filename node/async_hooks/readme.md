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

winston
https://github.com/winstonjs/winston/blob/master/docs/transports.md
