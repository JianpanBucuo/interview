module.exports = {
    entry:'./src/index.js',
    output:{
        // 虚拟打包路径
        publicPath:'/xuni',
        filename:'bundle.js'
    },
    devServer:{
        port:'8080',
        contentBase:'www'
    }
}