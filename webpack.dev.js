const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'file-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new webpack.DefinePlugin({
            'process.env.geonames_KEY' : JSON.stringify(process.env.geonames_KEY),
            'process.env.geoname_URL' : JSON.stringify(process.env.geoname_URL),
            'process.env.weatherbit_KEY' : JSON.stringify(process.env.weatherbit_KEY),
            'process.env.weatherbit_URL' : JSON.stringify(process.env.weatherbit_URL),
            'process.env.pixbay_KEY' : JSON.stringify(process.env.pixbay_KEY),
            'process.env.pixbay_URL' : JSON.stringify(process.env.pixbay_URL)
        })
    ]
}
