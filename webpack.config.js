const webpack = require('webpack');

const config = {
    entry: './reboot.js',
    output: {
        filename: 'docs/js/reboot-bundle.js',
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
                test: /(\.css)$/,
                loader: 'style!css?sourceMap'
            },
            {
                test: /(\.scss)$/,
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