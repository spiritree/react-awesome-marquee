const path = require("path");
const webpack = require("webpack");
const { dependencies } = require("./package.json");
module.exports = {
  entry: {
    vendor: Object.keys(dependencies)
  },
  output: {
    path: path.join(__dirname, "dll"),
    filename: "[name].dll.js",
    library: "[name]_library"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "dll", "[name]-manifest.json"),
      name: "[name]_library",
      context: __dirname
    })
  ]
};
