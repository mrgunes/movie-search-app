/**
 * The plugin will generate an HTML5 file that includes
 * all your webpack bundles in the body using script tags.
 */
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          /**
           * Use babel-loader for transforming
           * ES6 down to ES5.
           */
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            /**
             * Exports HTML as string. HTML is
             * minimized when the compiler demands.
             */
            loader: "html-loader"
          }
        ]
      },
      /** ESLint */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  /**
   * Allows to skip writing file extension
   *  while importing a module
   */
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
