## 自用脚手架工具 个人搭建

### 支持图片
安装 (npm install --save-dev)
- url-loader file-loader
```js
module:{
    rules:[
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                loader: 'url-loader',
                options: {
                      limit: 1024, //当图片大小小于 1imit值时，会使图片转换成dataurl
                      name: '[name].[ext]',
                      outputPath: 'images/' //将图片放到 images文件夹下
                }
                }
            ]
            }
    ]
}
```

### 支持 css
安装 (npm install --save-dev)
- style-loader 
- css-loader 

### 支持 scss
安装 (npm install --save-dev)
- scss-loader
```js
module:{
    rules:[
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                "sass-loader"
            ]
        }
    ]
}
```
### css添加浏览器前缀
安装 (npm install --save-dev)
- postcss-loader 
- autoprefixer 

webpack.config.js里添加
```js
module:{
    rules:[
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                "sass-loader",
                'postcss-loader'
            ]
        }
    ]
}
```
增加 postcss.config.js
```js

module.exports = {
    plugins:[
        require("autoprefixer")
    ]
}
```
或者直接在webpack.config.js里添加(不需再 postcss.config.js里配置)
```js
    rules:[{
        test:/\.less$/,
        use:['style-loader','css-loader',{
            loader:'postcss-loader',
            options:{
                plugins:[require('autoprefixer')]
            }
        },'less-loader'] // 从右向左解析原则
    }]

```
### 将css从js文件中分离出来
安装 (npm install --save-dev)
- mini-css-extract-plugin

它为每个包含css的js文件都创建一个css文件

修改webpack.config.js
```js
    module:{
        rules: [
        {
            test: /\.scss$/,
            use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
            ],
        }
        ]
    }
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css",
        })
    ]
```

### 支持 es6语法
安装 (npm install --save-dev)
-   @babel/cli 
-   @babel/core 
-   @babel/polyfill 
-   @babel/preset-env 
-   babel-loader 

webpack.config.js里配置
```js
     module:{
        rules:[
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader'
            },
        ]
    }
```

增加 babel.config.js
```js
const presets = [
  [
    "@babel/env",
    {
      modules: "commonjs", //支持commonjs语法
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };
```

### 清理dist文件夹
- clean-webpack-plugin

webpack.config.js 增加
```js
    plugins:[
        new CleanWebpackPlugin(),
    ]

```

### 增加html模板
- html-webpack-plugin

```js
    plugins:[
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
```

### 多入口文件开发
- html-webpack-plugin

在htmlWebpackPlugin里配置对应 html模板对应的入口文件
```js
    entry:{
        index:'./src/index.js',
        header: './src/header.js'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            chunks:['index'] //  与入口文件对应的模块名 如不指定则引入所有 entry入口js文件
        }),
        new htmlWebpackPlugin({
            template:'./src/header.html',
            filename:'header.html',
            chunks:['header'] //  与入口文件对应的模块名 如不指定则引入所有 entry入口js文件
        })
    ]
```
### 支持装饰语法

安装 (npm install --save-dev)

- @babel/plugin-proposal-decorators

babel.config.js里增加

```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];
const plugins = [
  ["@babel/plugin-proposal-decorators", { "legacy": true }] //增加这里
]
module.exports = { presets,plugins }
```

在VSCode里搜索experimentalDecorators, settings.json中设置javascript.implicitProjectConfig.experimentalDecorators为true

### 支持Typescript

安装 (npm install --save-dev)

- typescript ts-loader

webpack.config.js里增加
```js
    module:{
        rules:[
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude:'/node_modules/'
            }
        ]
    }
```

增加 tsconfig.json
```js
{
    "compilerOptions": {
        "outDir":"./dist",
        "module": "es6",
        "target": "es5",
        "allowJs": true,
        "experimentalDecorators": true
    }
}
```

### HappyPackPlugin

HappyPackPlugin通过把任务分解为多个子进程，使loader平行编译，加速打包速度

安装 (npm install --save-dev)

https://github.com/amireh/happypack

- happypack

```js
const HappyPack = require('happypack')
module.exports = {
     module:{
        rules:[
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                // loader: 'babel-loader'
                use: 'happypack/loader?id=jsx' //id为唯一标识， 对应 插件 happyPack里的 id
            },
        ]
     },
     plugins:[
        new HappyPack({
            id: 'jsx',
            threads: 4,
            loaders: [ 'babel-loader' ]
        })
     ]
// threads: Number 代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数。
// verbose: Boolean 是否允许 HappyPack 输出日志，默认是 true。
//threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
}
```

### 生产环境开发模式构建分离

安装 (npm install --save-dev)

- webpack-merge

```js
// webpack.common.js
//编写 公共配置
// 详见 build/webpack.common.js

// webpack.prod.js
//编写 生产环境独有的配置 并通过webpack-merge 合并 webpack.common.js里的公共配置
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common,{
    mode: 'development',
    devtool: 'inline-source-map',
    devServer:{
        contentBase:'./dist',
    }
})

// webpack.dev.js 
//编写 系统环境独有的配置 并通过webpack-merge 合并 webpack.common.js里的公共配置
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'production'
})
```