const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
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
                test: /\.(jpg|png)$/,
                use: {
                  loader: 'url-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new WorkboxPlugin.GenerateSW(),
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
