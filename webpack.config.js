var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.join(__dirname, './client/'),
  entry: {
    scripts: [
      './js/main.js', 
      './js/index.js', 
      './js/article.js',
      './js/newarticle.js',
      './js/tag.js',
      './js/ajax.js'
    ]
  },
  output: {
    path: path.join(__dirname, './public/'),
    filename: './javascripts/[name].js'
  },
  // plugins: [
  //   new CleanWebpackPlugin(['dist'], {
  //     verbose: true,
  //     dry: false
  //   }),
  //   new webpack.DefinePlugin(),
  //   new HtmlWebpackPlugin(),
  //   new CopyWebpackPlugin([ 
  //     { from: './assets/', to: './dist/assets/' },
  //     { from: './index.html', to: './dist/index.html' },
  //     { from: './fav.ico', to: './dist/fav.ico' },
  //   ])
  // ],
  module: {
    loaders: [{
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style', // backup loader when not building .css file
        'css!sass' // loaders to preprocess CSS
      )
    }]
  },
  plugins: [
    new ExtractTextPlugin('./stylesheets/main.min.css'),
  ]
};
