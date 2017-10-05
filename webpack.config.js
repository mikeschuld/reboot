const webpack = require("webpack");
const path = require("path");

const config = {
	entry: "./reboot.ts",
	output: {
		filename: "js/reboot-bundle.js",
		path: path.resolve("docs"),
		publicPath: "",
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
				loader: "style-loader!css-loader?sourceMap"
			},
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader?sourceMap!sass-loader?sourceMap"
			},
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