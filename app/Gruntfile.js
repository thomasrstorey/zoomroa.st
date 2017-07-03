/* eslint-disable import/no-extraneous-dependencies */
const loadGruntTasks = require('load-grunt-tasks');
const webpack = require('webpack');
const path = require('path');
const autoreset = require('postcss-autoreset');
const pify = require('pify');
const fs = require('fs');
const postcssEasyImport = require('postcss-easy-import');
const postcssCustomProps = require('postcss-custom-properties');
const postcssCalc = require('postcss-calc');
const postcssColorFn = require('postcss-color-function');
const postcssCustomMedia = require('postcss-custom-media');
const postcssApply = require('postcss-apply');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const rules = {
  inherited: {
    'border-collapse': 'separate',
    'border-spacing': 0,
    'caption-side': 'top',
    color: 'initial',
    cursor: 'auto',
    direction: 'initial',
    'empty-cells': 'show',
    'font-size-adjust': 'none',
    'font-family': 'initial',
    'font-size': 'medium',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'font-variant': 'normal',
    'font-weight': 'normal',
    font: 'initial',
    'letter-spacing': 'normal',
    'line-height': 'normal',
    'list-style-image': 'none',
    'list-style-position': 'outside',
    'list-style-type': 'disc',
    'list-style': 'initial',
    orphans: 2,
    quotes: 'initial',
    'tab-size': 8,
    'text-align': 'initial',
    'text-align-last': 'auto',
    'text-decoration-color': 'initial',
    'text-indent': 0,
    'text-justify': 'auto',
    'text-shadow': 'none',
    'text-transform': 'none',
    visibility: 'visible',
    'white-space': 'normal',
    widows: 2,
    'word-break': 'normal',
    'word-spacing': 'normal',
    'word-wrap': 'normal',
  },
  nonInherited: {
    animation: 'none 0s ease 0s 1 normal none running',
    'backface-visibility': 'visible',
    background: 'transparent none repeat 0 0 / auto auto padding-box border-box scroll',
    border: 'medium none currentColor',
    'border-image': 'none',
    'border-radius': '0',
    bottom: 'auto',
    'box-shadow': 'none',
    clear: 'none',
    clip: 'auto',
    columns: 'auto',
    'column-count': 'auto',
    'column-fill': 'balance',
    'column-gap': 'normal',
    'column-rule': 'medium none currentColor',
    'column-span': '1',
    'column-width': 'auto',
    content: 'normal',
    'counter-increment': 'none',
    'counter-reset': 'none',
    float: 'none',
    height: 'auto',
    hyphens: 'none',
    left: 'auto',
    margin: '0',
    'max-height': 'none',
    'max-width': 'none',
    'min-height': '0',
    'min-width': '0',
    opacity: '1',
    outline: 'medium none invert',
    overflow: 'visible',
    'overflow-x': 'visible',
    'overflow-y': 'visible',
    padding: '0',
    'page-break-after': 'auto',
    'page-break-before': 'auto',
    'page-break-inside': 'auto',
    perspective: 'none',
    'perspective-origin': '50% 50%',
    position: 'static',
    right: 'auto',
    'table-layout': 'auto',
    'text-decoration': 'none',
    top: 'auto',
    transform: 'none',
    'transform-origin': '50% 50% 0',
    'transform-style': 'flat',
    transition: 'none 0s ease 0s',
    'unicode-bidi': 'normal',
    'vertical-align': 'baseline',
    width: 'auto',
    'z-index': 'auto',
  },
};

// This applies only to the Component Root
// to stop inheritance and ensure
// styles encapsulation
const resetInherited = autoreset({
  reset: rules.inherited,
  rulesMatcher(rule) {
    const selector = rule.selector;
    return (
      selector.charAt(0) === '.' &&
      /^\.(?:[a-z0-9]*-)?[A-Z](?:[a-zA-Z0-9]+)$/.test(selector)
    );
  },
});

resetInherited.postcssPlugin = 'autoreset-suitcss-encapsulation-inherited';

// This applies to the Component Root and Descendants
const resetGeneric = autoreset({
  reset: rules.nonInherited,
  rulesMatcher: 'suit',
});

resetGeneric.postcssPlugin = 'autoreset-suitcss-encapsulation-nonInherited';

function noop() {}

function getFileContent(filename) {
  return pify(fs.readFile)(filename, 'utf8');
}

module.exports = (grunt) => {
  loadGruntTasks(grunt);

  grunt.initConfig({
    watch: {
      js: {
        files: [
          'src/{,**/}*.js',
        ],
        tasks: [
          'eslint:dev',
          'webpack:dev',
        ],
      },
      hbs: {
        files: [
          'src/{,**/}*.hbs',
        ],
        tasks: [
          'webpack:dev',
        ],
      },
      css: {
        files: [
          'src/{,**/}*.css',
        ],
        tasks: [
          'stylelint',
          'postcss:dev',
        ],
      },
    },

    stylelint: {
      options: {
        configFile: '.stylelintrc',
      },
      src: 'src/*.css',
    },

    postcss: {
      options: {
        map: true,
        processors: [
          postcssEasyImport({
            load: getFileContent,
            onImport: noop,
          }),
          postcssCustomProps(),
          postcssCalc(),
          postcssColorFn(),
          postcssCustomMedia(),
          postcssApply(),
          resetGeneric,
          resetInherited,
          autoprefixer({
            browsers: `> 1%, last 2 versions, safari > 6, ie > 9, ios > 6, android > 4.3, samsung > 3, chromeandroid > 50`,
          }),
          cssnano({
            calc: false,
            autoprefixer: false,
            mergeRules: false,
            safe: true,
          }),
        ],
      },
      dev: {
        src: 'src/index.css',
        dest: '../dist/css/style.min.css',
      },
    },

    eslint: {
      dev: {
        expand: true,
        cwd: 'src',
        src: ['**/*.js'],
      },
    },

    webpack: {
      dev: {
        entry: {
          main: './src/index.js',
        },

        output: {
          filename: '[name].js',
          path: path.resolve(__dirname, '../dist/js'),
        },

        devtool: 'source-map',

        resolve: {
          extensions: ['.js', '.hbs']
        },

        module: {
          rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                presets: ['stage-3'],
              },
            },
            {
              test: /\.hbs$/,
              loader: 'handlebars-loader',
              exclude: /node_modules/,
            },
          ],
        },

        plugins: [
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
              return module.context &&
              module.context.indexOf('node_modules') !== -1;
            },
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
          }),
        ],
      },
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
      },
    },

    copy: {
      dev: {
        files: [
          { expand: true, cwd: 'src', src: ['*.html'], dest: '../dist/', filter: 'isFile' },
          { expand: true, cwd: 'src/images', src: ['*'], dest: '../dist/images/', filter: 'isFile' },
        ],
      },
    },

  });

  grunt.registerTask('default', () => {
    grunt.task.run([
      'stylelint',
      'eslint:dev',
      'postcss:dev',
      'webpack:dev',
      'copy:dev',
      'watch',
    ]);
  });

  grunt.registerTask('test', () => {
    grunt.task.run([
      'webpack:dev',
      'karma:unit',
    ]);
  });
};
