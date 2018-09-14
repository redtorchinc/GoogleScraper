const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        }]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
