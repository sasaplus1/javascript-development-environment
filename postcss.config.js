'use strict';

module.exports = function(ctx) {
  return {
    plugins: {
      'autoprefixer': {
        browsers: [
          'last 2 versions',
          'last 2 ChromeAndroid versions',
          'Android >= 4',
          'iOS >= 8',
          'IE >= 8',
        ],
      },
      'cssnano': {
      },
    },
    syntax: 'postcss-scss',
  };
};
