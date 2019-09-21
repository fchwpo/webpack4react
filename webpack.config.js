const filePath = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const development = process.env.NODE_ENV == 'development';

module.exports = {
    entry: './entryScript/entrypoint.js',

    output: {
        path: filePath.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    mode: development ? 'development' : 'production',

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                // options: {
                //     presets: [/* '@babel/preset-env',  */'react']
                // }
            }
        }, {
            test: /\.s?css$/,
            use: [{
                loader: MiniCSSExtractPlugin.loader
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'sass-loader',
                options: {
                    implementation: require("sass")
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'images'
                }
            }]
        }]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "bundle.css"
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}