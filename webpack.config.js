const path = require('path');
module.exports = {
    entry: './src/index.js',// 入口
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'index.js',
        library: 'index', // 指定使用require时的模块名
        libraryTarget: 'umd', // 指定输出格式
        umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            // "@babel/plugin-proposal-private-methods",
                            // "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            }
        ]
    },
    devServer:{
        open:true,
        openPage:'./test/index.html'
    }
}