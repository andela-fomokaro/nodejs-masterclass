var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
  
module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'bundle.js'
  },
  target: 'node',
  devtool: "source-map",
  externals: [nodeExternals()],
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    },
  ]},
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.BannerPlugin({ 
      banner: 'require("source-map-support").install();', 
      raw: true, 
      entryOnly: false 
    })
  ],
};