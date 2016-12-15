'use strict';

const path = require('path');

const webpack = require('webpack');

module.exports = {

  context: __dirname,

  target: 'web',

  // entry: {
  //   index: `${__dirname}/src/index.js`
  // },

  output: {
    path: `${__dirname}/dest/`,
    publicPath: './',
    filename: '[name].js',
    chunkFilename: 'chunk-[id]-[hash].js',
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },

  module: {
    loaders: [
      { test: /\.css$/,   exclude: /node_modules/, loader: 'style!css!postcss' },
      { test: /\.js$/,    exclude: /node_modules/, loader: 'babel'             },
      { test: /\.json$/,  exclude: /node_modules/, loader: 'json'              },
      { test: /\.ya?ml$/, exclude: /node_modules/, loader: 'json!yaml'         },
    ],
  },

  postcss: function(webpackInstance) {
    return [
      require('postcss-import').call(global, {
        addDependencyTo: webpackInstance,
      }),
      require('postcss-simple-vars'),
      require('postcss-nested'),
      require('autoprefixer').call(global, {
        browsers: [
          'IE 8',
          'last 2 versions',
          // 'iOS >= 6',
          // 'Android >= 4',
          // 'last 3 ChromeAndroid versions',
        ],
      }),
      require('cssnano'),
    ];
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
      '',
      '.js',
      '.json',
      '.yml',
      '.yaml',
      '.css',
    ],
    modulesDirectories: [
      'node_modules',
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin,
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.DedupePlugin,
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
    new webpack.BannerPlugin([
      '@license Copyright(c) 2016 sasa+1',
      'Released under the MIT license.',
    ].join('\n'), {
      raw: false,
      entryOnly: true,
    }),
  ]),

};
