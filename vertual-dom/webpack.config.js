module.exports = {
    // entry:'./src/my-snabbdom/index.js',
    entry:'./src/mvvm/index.ts',
    // entry:'./src/index.js',
    output:{
        // 虚拟打包路径
        publicPath:'/xuni',
        filename:'bundle.js'
    },
    devServer:{
        port:'8080',
        contentBase:'www'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: "ts-loader" }
        ]
      }
}