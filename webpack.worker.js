const webpack = require('webpack');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

module.exports = (env, options) => {
    const plugins = [
        new CleanWebpackPlugin(['./dist'], {  watch: false }),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tslint: true
        }),
        new DuplicatePackageCheckerPlugin(),
    ];

    return {
        mode: 'production',
        entry: {
            work: './src/work.ts',
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, './dist/worker'),
        },
        optimization: {
            minimize: true
        },
        plugins,
        module: {
            rules: [
              {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack,
                            logLevel: 'warn'
                        }
                    },
                ]
              },
            ]
        },
        resolve: {
            extensions: [".ts", ".js"],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
                'bn.js': path.resolve(__dirname, 'node_modules/bn.js'),
                'eth-lib': path.resolve(__dirname, 'node_modules/eth-lib'),
            }
        },
    }
};