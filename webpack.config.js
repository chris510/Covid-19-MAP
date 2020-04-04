const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'app.bundle.js',
  },
  module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.scss$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: '/dist'
				})
			}
		]    
	},
	plugins: [ 
    new HtmlWebpackPlugin({
			title: 'My Covid Map',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			filename: 'index.html',
			template: __dirname + '/index.html',
		}),
		new ExtractTextPlugin({
			filename: 'app.css',
			disable: false,
			allChunks: true
		})
  ]
}	