var WebpackDevServer = require('webpack-dev-server'),
    webpack = require('webpack'),
    config = require('./webpack.local.config');

new WebpackDevServer(webpack(config), {
  hot: true,
  inline: true,
  quiet: true,
  contentBase: {
    target: 'http://localhost:' + (process.env.SERVER_PORT || 8080)
  }
}).listen(process.env.DEV_PORT || 8081, function(err, result) {
  if(err) throw err;
});
