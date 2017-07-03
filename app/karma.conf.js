/* eslint-disable import/no-extraneous-dependencies */
const karmaWebpack = require('karma-webpack');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'test/**/*.js',
    ],
    preprocessors: {
      'test/**/*.js': ['webpack'],
    },
    webpack: {
      devtool: 'source-map',
      resolve: {
        extensions: ['.js'],
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['env'],
            },
          },
        ],
      },
    },
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      karmaWebpack,
      'karma-babel-preprocessor',
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: 'INFO',
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
  });
};
