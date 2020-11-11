const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
    entry: '/src/index.js',// 入口
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'index.js',
        // library: 'datetool', // 指定使用require时的模块名
        libraryTarget: 'umd', // 指定输出格式
        // umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    optimization: {
        minimizer: [
            // 只有打包环境为production时才能生效
            new TerserWebpackPlugin({
                parallel: 4,
                extractComments: true,
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'] //移除console
                    }
                }
            })
        ],
    },
    module: {
        // rules: [
        //     {
        //         test: /\.js$/,
        //         exclude: /(node_modules|bower_components)/,
        //         use: {
        //             loader: 'babel-loader',
        //             options: {
        //                 presets: ['@babel/preset-env'],
        //                 plugins: [
        //                     "@babel/plugin-proposal-class-properties",
        //                     "@babel/plugin-transform-modules-umd",
        //                     // "@babel/plugin-proposal-private-methods",
        //                     // "@babel/plugin-transform-runtime"
        //                 ]
        //             }
        //         }
        //     }
        // ]
    },
    devServer:{
        open:true,
        openPage:'./test/index.html'
    }
}