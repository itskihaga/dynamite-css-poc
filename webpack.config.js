/* eslint-disable @typescript-eslint/no-var-requires */
const base = require("./webpack.base.config");
const { merge } = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src", "index.ts"),
    page1: path.resolve(__dirname, "src", "index.ts"),
    page2: path.resolve(__dirname, "src", "index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    port: 3000,
    host: "127.0.0.1",
    historyApiFallback: true,
    open: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "page1.html",
      inject: false,
      chunks: ["page1"],
      templateContent: ({ htmlWebpackPlugin }) => {
        return htmlWebpackPlugin.files.js
          .map((js) => `<script src="${js}"></script>`)
          .join("\n");
      },
    }),
  ],
};

module.exports = merge(base, config);
