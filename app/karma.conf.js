/* eslint-disable import/no-extraneous-dependencies */
const karmaWebpack = require('karma-webpack');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/index.js',
    ],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js', '.hbs'],
      },

      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['env', 'stage-3'],
            },
          },
          {
            test: /\.hbs$/,
            loader: 'handlebars-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            exclude: /node_modules/,
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
      'karma-sourcemap-loader',
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
