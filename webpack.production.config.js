var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/main",

  output: {
    path: __dirname + "/build/",
    filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader?stage=1" }
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
