//js
const path = require('path');
//html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//archios extra
const CopyPlugin = require('copy-webpack-plugin');
//variables de entorno (archivos .env y .env-example)
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: false,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [
            //rule de babel para js
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
             use: {
                loader: 'babel-loader'
                }
            },
            //rule de css (styl es un preprocesador de css)
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ],
            },
            //rule de archivos de imagen
            {
                test: /\.png$/,
                type: 'asset/resource'
            },
            //rule de archivos de fuentes
            {
                test: /\.(woff | woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'aplication/font-woff',
                        name: "[name].[contenthash].[ext]",
                        outputPath: './assets/fonts/',
                        publicPath: './assets/fonts/',
                        esModule: false,
                    }
                }
            }
        ]
    },

    plugins: [
        //plugin de html
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        //plugin de css
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        //plugin de archivos
        new CopyPlugin({
            patterns :[
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        //plugin de variables de entorno(.env)
        new Dotenv(),
    ],
}