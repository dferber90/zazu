/*** webpack.config.js ***/

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src/index.js"),
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            query: {
              modules: true,
              localIdentName: "[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(["dist"])],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
