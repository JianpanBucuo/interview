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
        path: path.resolve(__dirname, '../dist'),
        
        // publicPath:''
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
                      limit: 1,
                      name: '[name].[ext]',
                      outputPath: 'images/',
                    //   publicPath:'assets',
                    //   publicPath: (url, resourcePath, context) => {
                    //     // `resourcePath` is original absolute path to asset
                    //     // `context` is directory where stored asset (`rootContext`) or `context` option
             
                    //     // To get relative path you can use
                    //     // const relativePath = path.relative(context, resourcePath);
             
                    //     console.log('url:',url)
                    //     console.log('resourcePath',resourcePath)
                    //     console.log('context',context)
                    //     return `public_path/${url}`;
                    //   },
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
            chunks:['common','index'] // ????????????????????????????????? ??????????????????????????? entry??????js??????
        }),
        new htmlWebpackPlugin({
            template:'./src/header.html',
            filename:'header.html',
            chunks:['common', 'header'] // ????????????????????????????????? ??????????????????????????? entry??????js??????
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