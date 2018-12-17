const withPlugins = require("next-compose-plugins");
const ts = require("@zeit/next-typescript");
const css = require("@zeit/next-css");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = withPlugins([
  [
    css,
    {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
      },
    },
  ],
  [ts]], {
  webpack(config, options) {
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        tslint: true,
        tslintAutoFix: true,
        reportFiles: ["pages/**/*.{ts,tsx}"],
      }));
    }
    return config;
  },
});
