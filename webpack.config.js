const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports={
    mode: 'development',
    output:{
        filename: 'app.js',
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
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/gallery.html',
            filename: './gallery.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ],
}