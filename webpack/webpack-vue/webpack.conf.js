'use strict'

const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

// console.log(isDev)

const config = {
    target: 'web',

    // entry输入文件
    entry: {
        main: path.join(__dirname, 'src/main.js'),
        //index: path.join(__dirname, 'src/module/index.js')
    },
    // output输出文件
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // css预处理器
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name]-abc.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 根据不同的环境，选择不同的源代码环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]


}

if (isDev) {

    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8009,
        host: '0.0.0.0',
        // overlay显示错误信息
        overlay: {
            error: true
        },
        // 自动打开浏览器
        open: false,
        // 将没有映射的地址，映射到一个指定的地址上
        //historyFallback: {},
        // 热更新，只更新修改的组件，不会刷新页面
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config