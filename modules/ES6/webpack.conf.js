const webpack = require('webpack')
const path = require('path')

const config = {
    /*entry:{
        src:path.join(__dirname,'./src/main.js')
    },*/
    entry:'./src/main.js',
    output:{
        filename:'[name].min.js',
        path:path.join(__dirname,'dist')
    }/*,
    module:{
        rules:[
            {
                test:'/\.js$/',
                loader:'babel-loader'
            }
        ]
    }*/
}

module.exports = config