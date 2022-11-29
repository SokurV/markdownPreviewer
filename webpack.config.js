const path = require(`path`)
const HTMLPlugin = require("html-webpack-plugin")
const CCSextract = require('mini-css-extract-plugin')
const CSSminimizer = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    mode: `development`,
    entry: `./src/script/index.js`,
    output: {
        filename: `bundle.js`,
        path: path.resolve(__dirname, `dist`)
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CCSextract({
            filename: 'style.css',
        })
    ],
    module: {
        rules: [
            {
               /*  test: /\.css$/i,
                use: [
                    CCSextract.loader, 
                    "css-loader"
                ], */
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    CCSextract.loader,
                    "css-loader",
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
          new CSSminimizer(),
          new TerserPlugin(),
        ],
    }
}
