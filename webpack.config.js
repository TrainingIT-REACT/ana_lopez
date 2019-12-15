const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      '@material-ui/core',
      '@material-ui/icons',
      'prop-types',
      'react-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js'
    })
  ],
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    publicPath: '/',
    open: false,
    proxy: {
      '/albums': {
        target: 'http://localhost:3001',
        secure: false
      },
      '/songs': {
        target: 'http://localhost:3001',
        secure: false
      },
      '/images': {
        target: 'http://localhost:3001',
        secure: false
      },
      '/music': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
  },
  optimization: {
    runtimeChunk: 'single',
    usedExports: true,
    sideEffects: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: 'vendor',
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'hidden-source-map'
};
