### Proxy

一个 proxy 对象包装另一个对象对其进行拦截 （如读取/写入属性和其他操作）

```js
let proxy = new Proxy(targrt, handler)
// target - 要包装的对象，可以是任何东西，包括函数
// handler - 代理配置：带有钩子的对象
```

```js
const target = {}
let proxy = new Proxy(target, {})
proxy.test = 1
console.log(target.test) // 1
for (let key in proxy) alert(key) // test
```

写入操作 proxy.test 会直接将值写入 target
读取操作 proxy.test 会直接从 target 找对应的值
