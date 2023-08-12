/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { stylePaths } = require('./stylePaths');
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';

module.exports = merge(common('development'), {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: HOST,
    port: PORT,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      webSocketURL: 'ws://0.0.0.0:80/ws'
    },
    proxy: {
      '/ws': {
        target: 'ws://ahussey-aap-catalogue-nodejs.apps.sandbox-m4.g2pi.p1.openshiftapps.com:80/ws',
        ws: true
      }
    },
    open: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    client: {
      overlay: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [...stylePaths],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
