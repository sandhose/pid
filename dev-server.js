var WebpackDevServer = require('webpack-dev-server'),
    webpack = require('webpack'),
    config = require('./webpack.local.config');

var app = new WebpackDevServer(webpack(config), {
  hot: true,
  inline: true,
  noInfo: true,
  contentBase: {
    target: 'http://localhost:' + (process.env.SERVER_PORT || 8080)
  }
});

var server = app.listen(process.env.DEV_PORT || 8081, function(err, result) {
  if(err) throw err;

  var host = "localhost";
  var port = process.env.DEV_PORT || 8081;

  console.log("Dev server listening at http://%s:%s", host, port);
});
