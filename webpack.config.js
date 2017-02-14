'use strict';

const path = require('path');

const webpack = require('webpack');

module.exports = {

  context: __dirname,

  target: 'web',

  // entry: {
  //   index: `${__dirname}/src/index.js`,
  // },

  output: {
    path: `${__dirname}/dest/`,
    publicPath: './',
    filename: '[name].js',
    chunkFilename: 'chunk-[id]-[hash].js',
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.s[ac]ss$/,
        use: [
          { loader: 'style-loader'   },
          { loader: 'css-loader'     },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader'    },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.ya?ml$/,
        use: [
          { loader: 'json-loader' },
          { loader: 'yaml-loader' },
        ],
      },
    ],
  },

  // externals: {
  //   jquery: 'jQuery',
  //   lodash: '_',
  // },

  node: {
    Buffer: false,
    process: false,
  },

  resolve: {
    extensions: [
      '.js',
      '.json',
      '.yml',
      '.yaml',
      '.scss',
      '.sass',
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin,
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.AggressiveMergingPlugin,
  ].concat(
    (process.argv.some(arg => /^(?:-p|--optimize-minimize)$/.test(arg))) ? [
      // new webpack.DefinePlugin(
      // ),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          pure_funcs: [
            'log',
          ],
        },
        output: {
          comments: require('uglify-save-license'),
        },
      }),
    ] : [
      new webpack.DefinePlugin({
        log: function() {
          if (typeof console !== 'undefined') {
            if (typeof console.log === 'object') {
              // for IE8 and IE9
              Function.prototype.apply.call(console.log, console, arguments);
            } else {
              // for other browsers
              console.log.apply(console, arguments);
            }
          }
        },
      }),
    ]
  ).concat([
    new webpack.BannerPlugin({
      banner: [
        '@license Copyright(c) 2016 sasa+1',
        'Released under the MIT license.',
      ].join('\n'),
      entryOnly: true,
      raw: false,
    }),
  ]),

};
