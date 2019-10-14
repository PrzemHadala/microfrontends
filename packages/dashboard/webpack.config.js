const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  optimization: {
    usedExports: true,
  },
  devtool: "source-map",
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      '@material-ui': path.resolve('./node_modules/@material-ui')
    },
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
      { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    })
  ]
}