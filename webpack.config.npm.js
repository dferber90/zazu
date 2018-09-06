/*** webpack.config.js ***/

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");

const baseConfig = {
  entry: path.join(__dirname, "src/index.js"),
  mode: "production",
  output: { path: path.join(__dirname, "dist") },
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
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    // Adds peerDependencies as externals
    // See: https://webpack.js.org/guides/author-libraries/#externalize-lodash
    new PeerDepsExternalsPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};

module.exports = [
  {
    ...baseConfig,
    output: {
      ...baseConfig.output,
      library: "zazu",
      // UMD: available after AMD or CommonJS
      libraryTarget: "umd",
      filename: "index.js"
    }
  },
  {
    ...baseConfig,
    output: {
      ...baseConfig.output,
      library: "zazu",
      // avilable as window.zazu
      // available trough the window object, in the browser
      libraryTarget: "window",
      filename: "zazu.window.js"
    }
  },
  {
    ...baseConfig,
    output: {
      ...baseConfig.output,
      library: "zazu",
      // no idea what "this" is
      //  available through the this object
      libraryTarget: "this",
      filename: "zazu.this.js"
    }
  },
  {
    ...baseConfig,
    output: {
      ...baseConfig.output,
      library: "zazu",
      // for script tags
      // as a global variable made available by a script tag
      libraryTarget: "var",
      filename: "zazu.var.js"
    }
  }
];
