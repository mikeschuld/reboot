const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: './src/js/rb-core.js',
    output: {
        filename: 'docs/js/rb-bundle.js',
        path: '.'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /(\.css|\.scss)$/,
                loader: 'style!css?sourceMap!sass?sourceMap'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
}

module.exports = config;