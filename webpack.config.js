const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const path = require("path");
const fs = require("fs");

const pagesDir = path.join(__dirname, "src", "pages");
const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith(".pug"));

module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: path.join("images", "[name].[contenthash][ext]"),
  },
  entry: {
    main: path.join(__dirname, "src", "index.js"),
    table: path.join(__dirname, "src", "script.js"),
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    ...pages.map((page) => {
      const pageName = page.replace(".pug", "");
      return new HtmlWebpackPlugin({
        template: path.join(pagesDir, page),
        filename: `${pageName}.html`,
        chunks: [pageName === "table" ? "table" : "main"],
      });
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
      },
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 9000,
  },
};