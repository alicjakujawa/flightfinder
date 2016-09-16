var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack           = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/static/"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        include: __dirname
      },
      {
        test: /\.(sass|scss)?$/,
        loader: ExtractTextPlugin.extract("css!sass")
      },
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new ExtractTextPlugin("public/style.css", {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    })
  ]
}
