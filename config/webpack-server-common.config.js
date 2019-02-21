
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const PATHS = {
	root: path.resolve(__dirname, ".."),
	build: path.resolve(__dirname, "../build"),
	public_js: path.resolve(__dirname, "../public/javascripts"),
	public_css: path.resolve(__dirname, "../public/stylesheets"),
	public_img: path.resolve(__dirname, "../public/images"),
	source: path.resolve(__dirname, "../src/server"),
};

module.exports.PATHS = PATHS;

module.exports.config = {
	target: 'node',

	entry: {
		server: [
			path.join(PATHS.source, 'bin', 'www')
		],
	},

	externals: [nodeExternals()],

	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
			},
			{
				// For starters, just copy any file from public and copy it into the
				// build folder.  Later, we can think about transform .js, .css, .sass, etc.
				test: /\.(css|js|svg|ico|png|jpg|bmp)$/,
				include: [
					PATHS.public_js,
					PATHS.public_css,
					PATHS.public_img,
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							publicPath: (url, resourcePath, context) => {
								let retval = url.replace('public', '');
								console.log(`file-loader: url: ${url}, retval: ${retval}`);
								return retval;
							},
						},
					},
				],
			},
		],
	},

	node: {
		__dirname: false,
	}
};