const path = require('path')

const pkg = require('./package.json')

const rootPath = path.resolve(__dirname, './')

const config = {
    mode: 'production',
    entry: path.resolve(rootPath, 'lib', 'index.js'),
    output: {
        filename: `${pkg.name}.min.js`,
        path: path.resolve(rootPath, 'dist'),
        library: `${pkg.name}`,
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.(ts|js)$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }]
    }
}

module.exports = config