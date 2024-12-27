const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");

module.exports = {
  entry: "./index.js",
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new HtmlInlineScriptPlugin(),
  ],
  mode: "production",
};
