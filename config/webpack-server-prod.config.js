
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack-server-common.config').config;
const PATHS = require('./webpack-server-common.config').PATHS;

const pathsToClean = [
	'build/*.*'
];
const cleanOptions = {
	root: PATHS.root,
	dry: false,
	verbose: true,
};

module.exports = merge(common, {
	mode: 'production',

	output: {
		path: PATHS.build,
		chunkFilename: 'chunk-[name]-prod.js',
		filename: 'bundle-[name]-prod.js',
		devtoolModuleFilenameTemplate: '[absolute-resource-path]',
		//devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]',
	},

	devtool: false,	// Because I'm using the plug-in

	plugins: [
//		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new webpack.SourceMapDevToolPlugin({
			// This needs more research.  The idea is to create source maps
			// but not ship them, so that the developer can find source maps
			// on his/her machine.  I don't know what a "local sourcemap server"
			// is at this point, however:
			// https://itnext.io/using-sourcemaps-on-production-without-revealing-the-source-code-%EF%B8%8F-d41e78e20c89
			//publicPath: 'https://localhost:5050',
			filename: '[file].map',
			fallbackModuleFilenameTemplate: '[absolute-resource-path]',
			moduleFilenameTemplate: '[absolute-resource-path]',
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
});
