const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const MODE = 'development';

module.exports = [
  {
    mode: MODE,
    context: path.join(__dirname, 'src'),
    entry: './js/index.js',
    output: {
      path: path.resolve('public'),
      publicPath: '/public',
      filename: 'app.js'
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  {
    mode: MODE,
    context: path.join(__dirname, 'src'),
    entry: './css/style.scss',
    output: {
        path: path.resolve('public'),
        filename: 'style.css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                  loader: 'css-loader',
                  options: {
                      // If you are having trouble with urls not resolving add this setting.
                      // See https://github.com/webpack-contrib/css-loader#url
                      url: false,
                      minimize: true,
                      sourceMap: true
                  }
              },
              {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: true
                  }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.css')
      //if you want to pass in options, you can do so:
      //new ExtractTextPlugin({
      //  filename: 'style.css'
      //})
    ]
  }
]


// module.exports = {
//     mode: MODE,
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       },
//     ]
//   },
// };
