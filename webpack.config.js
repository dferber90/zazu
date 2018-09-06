/*** webpack.config.js ***/

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "examples/src/index.js"),
  mode: process.env.WEBPACK_SERVE ? "development" : "production",
  // TODO output currentply builds the demo,
  // but we ultimately want to build the component with it as well
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    // TODO clean either or, depending on what is being built
    new CleanWebpackPlugin(["dist", "examples/dist"]),
    htmlWebpackPlugin,
    // TODO only needed for demo
    new CopyWebpackPlugin([{ from: "examples/public" }])
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
