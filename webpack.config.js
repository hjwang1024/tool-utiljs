const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

const rootPath = path.resolve(__dirname, './')
const config = {
    mode: 'production',
    entry: path.resolve(rootPath, 'src', 'index.ts'),
    output: {
        filename: `${pkg.name}.min.js`,
        path: path.resolve(rootPath, 'dist'),
        library: `${pkg.name}`,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(rootPath, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    // 指定特定的ts编译配置，为了区分脚本的ts配置
                    configFile: path.resolve(__dirname, './tsconfig.json')
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}

module.exports = config
