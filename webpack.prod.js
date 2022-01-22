const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports={
    mode: 'production',
    output:{
        filename: 'app.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module:{
        rules:[
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset", 
                generator: {
                filename: 'assets/[hash][ext][query]'
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    optimization:{
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.[fullhash].html'
        }),
        new HtmlWebpackPlugin({
            template: './src/gallery.html',
            filename: './gallery.[fullhash].html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[fullhash].css'
        }),
    ],


}