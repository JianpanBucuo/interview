const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin') 
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')
const HappyPack = require('happypack')
module.exports = {
    entry:{
        common:'./src/common/common.js',
        index:'./src/index/index.js',
        header: './src/header/header.js'
    },
    output:{
        filename:'[name]/js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer:{
        contentBase:'./dist',
    },
     module:{
        rules:[
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: 'happypack/loader?id=jsx'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
              },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
                // use: 'happypack/loader?id=styles'
           }
        ]
     },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            chunks:['common','index'] // 与入口文件对应的模块名 如不指定则引入所有 entry入口js文件
        }),
        new htmlWebpackPlugin({
            template:'./src/header.html',
            filename:'header.html',
            chunks:['common', 'header'] // 与入口文件对应的模块名 如不指定则引入所有 entry入口js文件
        }),
        new MiniCssExtractPlugin({
            filename: "[name]/css/[name].css",
            chunkFilename: "[id]/css/[id].css",
        }),
        new HappyPack({
            id: 'jsx',
            threads: 4,
            loaders: [ 'babel-loader' ]
          })
    ]
}