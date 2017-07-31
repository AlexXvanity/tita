'use strict';

let webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['./build/main.js', './project/scss/style.scss'],
    output: {
        filename: 'build.js',
        //absolute path
        path: __dirname + '/build',
        //global variable
        library: 'app' 
    },

    /* a source map consists of a whole bunch of information that can
     be used to map the code within a compressed file back to it’s original source */
    devtool: 'inline-source-map',

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    /*Webpack 2 has a very strict configuration--
    that was moved to the plugins section using the webpack.LoaderOptionsPlugin */
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                emitErrors: true
            }
        }),
        //skip the emitting phase whenever there are errors while compiling
        new webpack.NoEmitOnErrorsPlugin(),


        new ExtractTextPlugin({ // define where to save the file
        filename: 'build.css',
        //generate single css file for the whole bundle
        allChunks: true
        }) 
        ],

 /*   
//minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
        compress: {
          // don't show unreachable variables etc
          warnings:     false,
          drop_console: true,
          unsafe:       true
        }
      })
    ],
    */

    module: {
        rules: [
        /*
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            */
            
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },


            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }

       ]
    }
}