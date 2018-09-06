const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const DEV = process.env.WEBPACK_SERVE;

module.exports = {
  entry: path.join(__dirname, "examples/src/index.js"),
  mode: DEV ? "development" : "production",
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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            query: {
              modules: true,
              localIdentName: DEV
                ? "[name]__[local]___[hash:base64:5]"
                : "[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["examples/dist"]),
    htmlWebpackPlugin,
    new CopyWebpackPlugin([{ from: "examples/public" }])
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
