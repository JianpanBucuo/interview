## 模块

### node 模块的实现

在 node 中引入模块，需要经历三个步骤

- 路径分析
- 文件定位
- 编译执行

在 node 中，模块分为两类，一类是 node 提供的模块，称为`核心模块`, 另一类是用户编写的模块，称为`文件模块`

#### 路径分析

##### 核心模块的路径分析

核心模块部分在 node 源代码编译过程中，编译进了二进制执行文件。
在 node 进程启动时，`部分核心模块就直接加载进内存中` 所以这部分核心模块引入时，`文件定位和编译执行这两个步骤可以省略调，并且在路径分析中优先判断`，所以它的加载速度是很快的。

文件模块是在运行时动态加载，需要完整的路径分析，文件定位，和编译执行过程

\*node 会缓存编译和执行过的对象

速度
缓存加载 > 核心模块 > 文件模块

##### 文件模块的路径分析

在第一次加载文件模块时， 在路径分析阶段，会将路径转换为真实路径，并以真实路径作为索引，将编译执行后的结果存放到缓存中，已使二次加载时更快

#### 文件定位

如果是.node 和.json 文件，在传递给 require()时，加上看扩展名，会加载一点速度

#### 模块编译（编译执行）

编译和执行是引入文件模块的最后一个阶段。定位到具体的文件后，node 会新建一个模块对象，然后根据路径载入并编译。对于不同的文件扩展名，其载入方法也有所不同

- .js 文件 通过 fs 模块同步读取文件后的编译执行
- .node 文件 这是用 C/C++编写的扩展文件，通过 dlopen()方法加载最后编译生成的文件
- .json 文件 通过 fs 模块同步读取文件后，用 JSON.parse()解析返回结果
- 其余扩展名文件 都被当做.js 文件载入

根据不同的文件扩展名，node 会调用不同的读取方式，如.json 文件的调用如下

```js
Module.extensions['.json'] = function (module, filename) {
  var content = NativeModule.require('fs').readFileSync(filename, 'utf-8')
  try {
    module.exports = JSON.parse(stripBOM(content))
  } catch (err) {
    err.message = filename + ':' + err.message
    throw err
  }
}
```

console.log(require.extensions) 会解析看到.js/.json/.node 文件的方法

在编译过程中，node 对获取的 javascript 文件内容进行了头尾包装，

```js
;(function (exports, require, module, __filename, __dirname) {
  var math = require('math')
  exports.area = function (radius) {
    return Math.PI * radius * radius
  }
})
```
