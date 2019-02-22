
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack-server-common.config').config;
const PATHS = require('./webpack-server-common.config').PATHS;

module.exports = merge(common, {
	mode: 'development',
	//devtool: 'source-map',

	output: {
		path: PATHS.build,
		chunkFilename: 'chunk-[name]-dev-4.js',
		filename: 'bundle-[name]-dev-4.js',
		devtoolModuleFilenameTemplate: '[absolute-resource-path]',
		//devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]',
	},

	devtool: false,	// Because I'm using the plug-in

	plugins: [

		// https://webpack.js.org/plugins/source-map-dev-tool-plugin/
		new webpack.SourceMapDevToolPlugin({
			filename: "[file].map",
		//	fallbackModuleFilenameTemplate: '[absolute-resource-path]',
		//	moduleFilenameTemplate: '[absolute-resource-path]',
		}),

		// According to https://jlongster.com/Backend-Apps-with-Webpack--Part-I, the following
		// causes stack traces to be source-mapped.  However, when using SourceMapDevToolPlugin
		// rather than "devtool: 'source-map'", I found I did not need source-map-support.
		// Will we need it on the client?  We'll have to see.
		new webpack.BannerPlugin({
				banner: 'require("source-map-support").install();',
				raw: true,
				entryOnly: true
		}),

	],

	//watch: true,
	watchOptions: {
		aggregateTimeout: 500,
	},
});