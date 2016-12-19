const webpack = require("webpack");

const config = {
	entry: "./reboot.ts",
	output: {
		filename: "docs/js/reboot-bundle.js",
		path: "."
	},
	devtool: "source-map",
	module: {
		loaders: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			},
			{
				test: /\.css$/,
				loader: "style!css?sourceMap"
			},
			{
				test: /\.scss$/,
				loader: "style!css?sourceMap!sass?sourceMap"
			}
		],
		preLoaders: [
			{
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery",
			jquery: "jquery",
			_: "lodash"
		})
	]
};

module.exports = config;